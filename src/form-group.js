import React, { Component } from 'react'
import { Row } from 'antd'
export default class FormGroup extends Component {
  render() {
    return (
      <div className="ke-form-item">
        <div className="ke-form-head">
          <div className="ke-form-title">
            {this.props.title}
          </div>
        </div>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} className="ke-form-body">
          {this.props.children}
        </Row>
      </div>
    )
  }
}
