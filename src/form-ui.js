import React, { Component } from 'react'
import { Form, Col } from 'antd';
import Field from './form-field';
import FieldGroup from './form-group';
import './index.css';

class formUI extends Component {
  renderFields() {
    const { formConfig } = this.props;
    const { fields, groups, style = {} } = formConfig;

    if (!groups) {
      return this.renderArea(fields, style);
    }

    return groups.map((group) => {
      const currentFields = fields.filter((item) =>
        item.group == group.name && item.visible !== false
      );

      const style = group.style || formConfig.style || null;
      const itemCol = style && style.itemCol || null;
      const labelCol = style && style.labelCol || null;
      const wrapperCol = style && style.wrapperCol || null;

      return (
        <FieldGroup title={group.title} key={group.name}>
          {this.renderArea(
            currentFields, {
              itemCol,
              labelCol,
              wrapperCol
            }
          )}
        </FieldGroup>
      )
    });
  }

  renderArea(fields, parentStyle) {
    const { formConfig, emitter } = this.props;

    return (
      fields.map((item) => {
        // 对于字段：继承或覆盖分组样式
        const style = item.style;
        const itemCol = style && style.itemCol || parentStyle.itemCol || {};
        const labelCol = style && style.labelCol || parentStyle.labelCol || {};
        const wrapperCol = style && style.wrapperCol || parentStyle.wrapperCol || {};
        return (
          <Col  {...itemCol} key={item.name}>
            <Field
              labelCol={labelCol}
              wrapperCol={wrapperCol}
              emitter={emitter}
              formConfig={formConfig}
              form={this.props.form}
              config={item} />
          </Col>
        )
      })
    )
  }

  componentDidMount() {
    this.props.onCreate(this.props.form);
  }

  render() {
    return (
      <div className="ke-form">
        <Form>
          {this.renderFields()}
        </Form>
      </div>
    );
  }
}

export default formUI;