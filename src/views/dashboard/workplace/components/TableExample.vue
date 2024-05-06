<!-- 支持使用tsx语法 -->
<script lang='tsx' setup>
import { Button, Popconfirm } from '@arco-design/web-vue'
import type { FormInstance, TableColumnData } from '@arco-design/web-vue'
import { clone } from 'lodash'
import { computed, reactive, ref } from 'vue'

const data = reactive([{
  key: '1',
  name: 'Jane Doe',
  salary: 23000,
  address: '32 Park Road, London',
  email: 'jane.doe@example.com',
}, {
  key: '2',
  name: 'Alisa Ross',
  salary: 25000,
  address: '35 Park Road, London',
  email: 'alisa.ross@example.com',
}, {
  key: '3',
  name: 'Kevin Sandra',
  salary: 22000,
  address: '31 Park Road, London',
  email: 'kevin.sandra@example.com',
}, {
  key: '4',
  name: 'Ed Hellen',
  salary: 17000,
  address: '42 Park Road, London',
  email: 'ed.hellen@example.com',
}, {
  key: '5',
  name: 'William Smith',
  salary: 27000,
  address: '62 Park Road, London',
  email: 'william.smith@example.com',
}])

type DataItem = typeof data[0]

const editForm = ref<null | FormInstance>(null)
const editDataIdx = ref<number | null>(null)
const editData = ref<DataItem | null>(null)
const isOnEdit = computed(() => editDataIdx.value !== null)
function handelEdit(idx: number) {
  editDataIdx.value = idx
  // 此处需要深拷贝，否则编辑时会影响到原数据
  editData.value = clone(data[idx])
}
async function handelSave() {
  // 此处进行表单校验
  const err = await editForm.value?.validate()
  if (err)
    return
  if (editData.value)
    data[editDataIdx.value as number] = editData.value

  editDataIdx.value = null
  editData.value = null
}

const columns: TableColumnData[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Action',
    // 可以直接使用jsx语法
    render: (row) => {
      return (
        <div>
          <Button
            onClick={() => handelEdit(row.rowIndex)}
            type="primary"
          >
            Edit
          </Button>
          <Popconfirm
            content="你确定？"
            onOk={() => {
              data.splice(row.rowIndex, 1)
            }}
          >
            <Button type="secondary" class="ml-4" status="danger">Delete</Button>
          </Popconfirm>
        </div>
      )
    },
  },
]
</script>

<template>
  <div class="p-4">
    <ATypographyTitle class="mb-4">
      Table 示例
    </ATypographyTitle>
    <ATable :columns="columns" :data="data" />

    <!-- edit -->
    <a-modal :visible="isOnEdit" @ok="handelSave" @cancel="editDataIdx = null">
      <template #title>
        编辑
      </template>
      <!-- 此处使用 v-if 主要用于ts断言非null -->
      <AForm v-if="editData" ref="editForm" :model="editData">
        <AFormItem label="Name" field="name" required>
          <AInput v-model="editData.name" />
        </AFormItem>
        <AFormItem label="Salary" field="salary" required>
          <AInputNumber v-model="editData.salary" />
        </AFormItem>
        <AFormItem label="Address" field="address" required>
          <AInput v-model="editData.address" />
        </AFormItem>
        <AFormItem
          label="Email" field="email" required :rules="[
            { type: 'email', message: '请输入正确的邮箱格式' },
          ]"
        >
          <AInput v-model="editData.email" />
        </AFormItem>
      </AForm>
    </a-modal>
  </div>
</template>
