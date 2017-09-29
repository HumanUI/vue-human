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
            <mn-select-list-picker
            :options="options.default"
            :value="models.default"
            @openSelect="config => openSelect('default', config)"></mn-select-list-picker>
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            可搜索
          </mn-card-prefix>
          <mn-card-body>
            <mn-select-list-picker
            :options="options.search"
            :value="models.search"
            :searchable="true"
            @openSelect="config => openSelect('search', config)"></mn-select-list-picker>
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            多选
          </mn-card-prefix>
          <mn-card-body>
            <mn-select-list-picker
            :options="options.multiple"
            :value="models.multiple"
            :multiple="true"
            @openSelect="config => openSelect('multiple', config)"></mn-select-list-picker>
          </mn-card-body>
        </mn-card-item>
      </mn-card>
    </mn-section>
  </page>
</template>

<script>
import selectList from '../../../../suites/selectList'
import SelectList from '../../../../utils/SelectList'
export default {
  components: {
    ...selectList.map()
  },
  data () {
    return {
      models: {
        default: undefined,
        search: undefined,
        multiple: undefined
      },
      options: {
        default: [
          { label: 'Choose your city', value: undefined },
          { label: 'Shanghai', value: 'Shanghai' },
          { label: 'Suzhou', value: 'Suzhou' },
          { label: 'Hangzhou', value: 'Hangzhou' }
        ],
        search: [
          { label: 'Choose your city', value: undefined },
          { label: 'Shanghai', value: 'Shanghai' },
          { label: 'Suzhou', value: 'Suzhou' },
          { label: 'Hangzhou', value: 'Hangzhou' }
        ],
        multiple: [
          { label: 'Choose your city', value: undefined },
          { label: 'Shanghai', value: 'Shanghai' },
          { label: 'Suzhou', value: 'Suzhou' },
          { label: 'Hangzhou', value: 'Hangzhou' }
        ]
      }
    }
  },
  methods: {
    openSelect (name, config) {
      SelectList.create({
        value: this.models[name],
        options: this.options[name],
        ...config
      }).show().on('confirm', option => {
        this.models[name] = option.value
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
