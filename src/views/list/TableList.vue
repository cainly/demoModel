<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="选择日期">
                <a-range-picker @change="onChangeDate" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="选择城市">
                <a-select :defaultValue="provinceData[0]" style="width: 120px" @change="handleProvinceChange">
									<a-select-option v-for="province in provinceData" :key="province">{{province}}</a-select-option>
								</a-select>
								<a-select v-model="secondCity" style="width: 120px">
									<a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
								</a-select>
              </a-form-item>
            </a-col>
			<a-col :md="8"></a-col>
          </template>
          <a-col :md="!advanced && 8 || 8" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'left', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
        <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button>
		<a-button @click="$refs.demoList.add()">DEMO</a-button>
		
		<a-button class="primary" @click="linkAction">忘记密码</a-button>
		<a-button style="margin-left: 8px" @click="deleteModel" :disabled="selectedRowKeys.length == 0"><a-icon type="delete"/>删除</a-button>
    </div>
    <a-table
      ref="table"
      size="default"
      rowKey="(record) => record.key"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
    >
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">修改</a>
          <a-divider type="vertical" />
          <a @click="deleteModel">删除</a>
        </template>
      </span>
    </a-table>
    <create-form ref="createModal" @ok="handleOk" />
    <step-by-step-modal ref="modal" @ok="handleOk"/>
	<demoList ref="demoList" @ok="handleOk" />
	
	<!-- <linkmodel ref="linkList"/>	 -->
		
	<a-modal title="删除" :width="640" :visible="visible" @ok="handleDel" @cancel="handleCancel">
			是否删除所选项?
	</a-modal>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
import { getRoleList, getServiceList } from '@/api/manage'
import demoList from './modules/demoList'
import linkList from './modules/link'
const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}
const provinceData = ['浙江', '江苏'];
const cityData = {
  浙江: ['杭州', '宁波', '温州'],
  江苏: ['南京', '苏州', '镇江'],
};

export default {
  name: 'TableList',
  components: {
    STable,
    CreateForm,
	demoList,
	linkList,
    StepByStepModal
  },
  data () {
    return {
			provinceData,
      cityData,
			visible:false,
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '规则名称',
          dataIndex: 'no'
        },
        {
          title: '描述',
          dataIndex: 'description'
        },
        {
          title: '服务调用次数',
          dataIndex: 'callNo',
          needTotal: false,
          customRender: (text) => text + ' 次'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    this.tableOption()
    getRoleList({ t: new Date() })
  },
  methods: {
		linkAction() {
			
		},
		deleteModel() {
			this.visible = true
		},
		handleCancel(){
			this.visible = false
		},
		//删除操作
		handleDel(){
			 console.log(this.selectedRowKeys);
			 return tabDelete(Object.assign(parameter,this.selectedRowKeys))
          .then(res => {
						if(res.result == 0){
							this.$message.success('删除成功');
							this.$refs.table.refresh()
						}
        })
		},
		handleProvinceChange(value) {
			this.cities = cityData[value]
			this.secondCity = cityData[value][0]
		},
		onChangeDate (date, dateString) {
			console.log(date, dateString)
		},
		tableOption () {
		this.options = {
			rowSelection: {
			selectedRowKeys: this.selectedRowKeys,
			onChange: this.onSelectChange
			}
		}
		},
		handleEdit (record) {
		console.log(record)
		this.$refs.modal.edit(record)
		},
    handleOk () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
<style lang="less">
.ant-table-thead > tr > th, .ant-table-tbody > tr > td{
	padding:8px 16px;
}
.table-page-search-wrapper .ant-form-inline .ant-form-item{
	margin-bottom:12px;
}
.ant-select-selection{
	margin-right:5px;
}
</style>
