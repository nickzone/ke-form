import React, { Component } from 'react'
import { Row } from 'antd'
export default class FormGroup extends Component {
  render() {
    return (
      <div className="ke-formgroup-item">
        <div className="ke-formgroup-head">
          <div className="ke-formgroup-title">
            {this.props.title}
          </div>
        </div>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} className="ke-formgroup-body">
          {this.props.children}
        </Row>
      </div>
    )
  }
}
