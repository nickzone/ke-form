export const schema = {
  groups: [
    {
      name: "base",
      title: "基本信息（栅格布局）",
      style: {
        itemCol: {
          span: 8
        },
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 16
        }
      }
    }, 
    {
      name: "verticle",
      title: "基本信息（垂直布局）",
      style: {
        itemCol: {
          span: 24
        },
        labelCol: {
          span: 3
        },
        wrapperCol: {
          span: 21
        }
      }
    }
  ],
    fields: [
      {
        group: "base",
        type: "input",
        label: "姓氏",
        name: "firstname",
        props: {
          allowClear: true
        },
        rules: [{
          required: true
        }]
      },
      {
        group: "base",
        type: "text",
        label: "文本",
        name: "text"
      },
      {
        type: "input",
        group: "base",
        label: "名称",
        name: "lastname",
        dependEvents: [
          {
            target: "firstname"
          }
        ]
      },
      {
        type: "select", // 选择框
        group: "base",
        name: "city",
        label: "城市",
        options: [
          { key: "beijing", value: "北京" },
          { key: "shanghai", value: "上海" }
        ]
      },
      {
        type: "datepicker", // 日期选择
        group: "base",
        name: "date",
        label: "日期"
      },
      {
        group: "base",
        type: "radio", // 多选框
        name: "sex",
        label: "性别",
        options: [{ key: "0", value: "男" }, { key: "1", value: "女" }]
      },
      {
        group: "verticle",
        type: "checkbox", // 单选框
        name: "aihao",
        label: "爱好",
        options: [
          { key: "football", value: "足球" },
          { key: "basketball", value: "篮球" }
        ]
      },
      {
        group: "verticle",
        type: "switch", // 开关
        name: "active",
        label: "启用自我介绍"
      },
      {
        group: "verticle",
        type: "textarea", // 文本框
        name: "intro",
        label: "自我介绍"
      }
    ]
}