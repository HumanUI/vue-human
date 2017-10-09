<template>
  <page>
    <mn-section>
      <mn-letter>
        <mn-letter-body>
          <h1>SelectList</h1>
        </mn-letter-body>
      </mn-letter>
    </mn-section>
    <mn-section>
      <mn-card>
        <mn-card-item>
          <mn-card-prefix>
            默认
          </mn-card-prefix>
          <mn-card-body>
            <mn-select-list-picker :options="options.default" :value.sync="models.default"></mn-select-list-picker>
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            可搜索
          </mn-card-prefix>
          <mn-card-body>
            <mn-select-list-picker :options="options.search" :value.sync="models.search" searchable></mn-select-list-picker>
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            多选
          </mn-card-prefix>
          <mn-card-body>
            <mn-select-list-picker :options="options.multiple" :value.sync="models.multiple" multiple></mn-select-list-picker>
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            远程搜索
          </mn-card-prefix>
          <mn-card-body>
            <mn-select-list-picker :options="options.remote" :value.sync="models.remote" remote searchable :remoteMethod="remoteMethod"></mn-select-list-picker>
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            禁用
          </mn-card-prefix>
          <mn-card-body>
            <mn-select-list-picker :options="options.disable" :value.sync="models.disable" disable></mn-select-list-picker>
          </mn-card-body>
        </mn-card-item>
      </mn-card>
    </mn-section>
    <mn-section>
      <mn-card>
        <mn-card-item>
          <h3>Attributes</h3>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            属性
          </mn-card-prefix>
          <mn-card-body>
            说明
          </mn-card-body>
          <mn-card-body>
            类型
          </mn-card-body>
          <mn-card-body>
            默认值
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            value
          </mn-card-prefix>
          <mn-card-body>
            值
          </mn-card-body>
          <mn-card-body>
            String, Number, Array
          </mn-card-body>
          <mn-card-body>
            -
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            options
          </mn-card-prefix>
          <mn-card-body>
            选项
          </mn-card-body>
          <mn-card-body>
            Array[Option]
          </mn-card-body>
          <mn-card-body>
            -
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            searchable
          </mn-card-prefix>
          <mn-card-body>
            是否可搜索
          </mn-card-body>
          <mn-card-body>
            Boolean
          </mn-card-body>
          <mn-card-body>
            false
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            multiple
          </mn-card-prefix>
          <mn-card-body>
            是否为多选
          </mn-card-body>
          <mn-card-body>
            Boolean
          </mn-card-body>
          <mn-card-body>
            false
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            remote
          </mn-card-prefix>
          <mn-card-body>
            是否远程搜索，若此项为 true , searchable 需为 true , remoteMethod 为必选, 无需传入 options
          </mn-card-body>
          <mn-card-body>
            Boolean
          </mn-card-body>
          <mn-card-body>
            false
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            remoteMethod
          </mn-card-prefix>
          <mn-card-body>
            异步获取 options 的方法, 必须返回 options
          </mn-card-body>
          <mn-card-body>
            Function
          </mn-card-body>
          <mn-card-body>
            -
          </mn-card-body>
        </mn-card-item>
      </mn-card>
    </mn-section>
    <mn-section>
      <mn-card>
        <mn-card-item>
          <h3>Option</h3>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            属性
          </mn-card-prefix>
          <mn-card-body>
            说明
          </mn-card-body>
          <mn-card-body>
            类型
          </mn-card-body>
          <mn-card-body>
            默认值
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            label
          </mn-card-prefix>
          <mn-card-body>
            选项的名字
          </mn-card-body>
          <mn-card-body>
            String
          </mn-card-body>
          <mn-card-body>
            -
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            value
          </mn-card-prefix>
          <mn-card-body>
            选项的值
          </mn-card-body>
          <mn-card-body>
            String, Number
          </mn-card-body>
          <mn-card-body>
            -
          </mn-card-body>
        </mn-card-item>
      </mn-card>
    </mn-section>
    <mn-section>
      <mn-card>
        <mn-card-item>
          <h3>remoteMethod</h3>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            参数
          </mn-card-prefix>
          <mn-card-body>
            说明
          </mn-card-body>
          <mn-card-body>
            类型
          </mn-card-body>
          <mn-card-body>
            默认值
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            search
          </mn-card-prefix>
          <mn-card-body>
            搜索框中输入的值
          </mn-card-body>
          <mn-card-body>
            String
          </mn-card-body>
          <mn-card-body>
            -
          </mn-card-body>
        </mn-card-item>
      </mn-card>
    </mn-section>
  </page>
</template>

<script>
import selectList from '../../../../suites/selectList'
import axios from 'axios'
export default {
  components: {
    ...selectList.map()
  },
  data () {
    return {
      models: {
        default: undefined,
        search: undefined,
        multiple: ['Shanghai'],
        remote: undefined,
        disable: undefined
      },
      options: {
        default: [
          { label: '选择你的城市', value: undefined },
          { label: '上海', value: 'Shanghai' },
          { label: '苏州', value: 'Suzhou' },
          { label: '杭州', value: 'Hangzhou' },
          { label: '北京', value: 'Beijing' },
          { label: '南京', value: 'Nanjin' },
          { label: '天津', value: 'Tianjin' }
        ],
        search: [
          { label: '选择你的城市', value: undefined },
          { label: '上海', value: 'Shanghai' },
          { label: '苏州', value: 'Suzhou' },
          { label: '杭州', value: 'Hangzhou' },
          { label: '北京', value: 'Beijing' },
          { label: '南京', value: 'Nanjin' },
          { label: '天津', value: 'Tianjin' }
        ],
        multiple: [
          { label: '上海', value: 'Shanghai' },
          { label: '苏州', value: 'Suzhou' },
          { label: '杭州', value: 'Hangzhou' },
          { label: '北京', value: 'Beijing' },
          { label: '南京', value: 'Nanjin' },
          { label: '天津', value: 'Tianjin' },
          { label: '重庆', value: 'Chongqing' },
          { label: '成都', value: 'Chengdu' }
        ],
        remote: [

        ],
        disable: [
          { label: '选择你的城市', value: undefined },
          { label: '上海', value: 'Shanghai' }
        ]
      }
    }
  },
  methods: {
    async remoteMethod (search) {
      const response = await axios.get('/api/movie/search', {
        params: { q: search, start: 0, count: 20 }
      })
      return response.data.subjects.map(item => {
        return {
          label: item.title,
          value: item.id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.is-prefix {
  min-width: 8rem;
}
</style>
