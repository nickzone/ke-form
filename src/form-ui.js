import React, { Component } from 'react'
import { Form, Col, Row } from 'antd';
import Field from './form-field';
import FieldGroup from './form-group';
import './index.css';

class formUI extends Component {
  renderFields() {
    const { formConfig } = this.props;
    const { fields, groups, style = {} } = formConfig;

    // 不需要分组，直接渲染
    if (!groups) {
      return (
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} type="flex" justify="start">
          {this.renderArea(fields, style)}
        </Row>
      );
    }

    // 否则，需要渲染分组
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
              form={this.props.form}
              context={this.props.formContext}
              config={item} />
          </Col>
        )
      })
    )
  }

  getContainerCls = () => {
    const { className } = this.props;
    const BASIC_CLASS = "ke-form";
    
    return className ? BASIC_CLASS + ' ' +  className : BASIC_CLASS;
  }

  componentDidMount() {
    this.props.onCreate(this.props.form);
  }

  render() {
    return (
      <div className={this.getContainerCls()}>
        <Form>
          {this.renderFields()}
        </Form>
      </div>
    );
  }
}

export default formUI;