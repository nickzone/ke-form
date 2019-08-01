import React, { Component } from 'react'
import { Form, Col } from 'antd';
import Field from './form-field';
import FieldGroup from './form-group';
import './index.css';

const DefaultItemCol = {};
const DefaultLabelCol = {};
const DefaultWrapperCol = {};

class formUI extends Component {
  renderFields() {
    const { fields, groups } = this.props.formStore;
    return groups.map((group) => {
      // 获取分组样式
      const groupFields = fields.filter((item) => item.group == group.name && item.visible !== false);
      const groupStyle = group.style;
      const groupItemStyle = groupStyle && groupStyle.itemCol || DefaultItemCol;
      const groupLabelCol = groupStyle && groupStyle.labelCol || DefaultLabelCol;
      const groupWrapperCol = groupStyle && groupStyle.wrapperCol || DefaultWrapperCol;
      return (
        <FieldGroup title={group.title} key={group.name}>
          {groupFields.map((item) => {
            // 对于字段：继承或覆盖分组样式
            const fieldStyle = item.style;
            const fieldItemStyle = fieldStyle && fieldStyle.itemCol || groupItemStyle;
            const fieldLabelCol = fieldStyle && fieldStyle.labelCol || groupLabelCol;
            const fieldWrapperCol = fieldStyle && fieldStyle.wrapperCol || groupWrapperCol;
            return (
              <Col  {...fieldItemStyle} key={item.name}>
                <Field
                  labelCol={fieldLabelCol}
                  wrapperCol={fieldWrapperCol}
                  formStore={this.props.formStore}
                  form={this.props.form} field={item} />
              </Col>
            )
          })}
        </FieldGroup>
      )

    });
  }

  componentDidMount() {
    this.props.onCreate(this.props.form);
  }

  render() {
    return (
      <div className="ke-formgroup">
        <Form>
          {this.renderFields()}
        </Form>
      </div>
    );
  }
}

export default formUI;