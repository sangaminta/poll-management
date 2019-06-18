import React, { Component } from "react";
import Viewdetail from "../component/Viewdetail";
import { connect } from "react-redux";
import {
  pollSetId,
  selectOption,
  userdovote,
  isedit,
  edit_text,
  addtitle,
  deleteoption,
  deleteoptionRequest
} from "../redux/action/LoginAction";

class Viewdetailpolls extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.actionForSetId(id);
  }
  componentDidUpdate(previousProps) {
    const { pollidData } = this.props;
    const id = this.props.match.params.id;
    if (
      pollidData.isDeleteSuccess !== previousProps.pollidData.isDeleteSuccess
    ) {
      const option = this.props.option;
      this.props.actionForSetId(id);
    }
  }

  handleChecked = option => {
    this.props.actionForSetOption(option);
  };

  handleClick = e => {
    const value = {
      name: this.props.option,
      id: this.props.id
    };
    this.props.actionForDoVote(value);
  };

  handleIsEdit = e => {
    const isEdit = !this.props.isEdit;
    this.props.actionForEditTitle(isEdit);
  };

  handleEditTitle = title => {
    this.props.actionForTextValue(title);
  };

  updateEditText = e => {
    e.preventDefault();
    const submit_value = {
      pollId: this.props.id,
      pollTitle: this.props.changedTittle
    };
    this.props.actionForSubmitNewTitle(submit_value);
  };

  handleDeleteOption = option => {
    const delete_value = {
      pollId: this.props.id,
      polloption: option
    };
    this.props.deleteoptionRequest();
    this.props.actionForDeleteOption(delete_value);
  };

  render() {
    return (
      <div>
        <Viewdetail
          handleChecked={this.handleChecked}
          {...this.props.success}
          handleClick={this.handleClick}
          handleIsEdit={this.handleIsEdit}
          isEdit={this.props.isEdit}
          handleEditTitle={this.handleEditTitle}
          updateEditText={this.updateEditText}
          handleDeleteOption={this.handleDeleteOption}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actionForSetId: data => dispatch(pollSetId(data)),
    actionForSetOption: name => dispatch(selectOption(name)),
    actionForDoVote: user => dispatch(userdovote(user)),
    actionForEditTitle: edit => dispatch(isedit(edit)),
    actionForTextValue: text => dispatch(edit_text(text)),
    actionForSubmitNewTitle: title => dispatch(addtitle(title)),
    actionForDeleteOption: value => dispatch(deleteoption(value)),
    deleteoptionRequest: () => dispatch(deleteoptionRequest())
  };
};

const mapStateToProps = state => {
  return {
    id: state.Pollidreducer.id,
    success: state.Pollidreducer.success,
    option: state.Pollidreducer.option,
    isEdit: state.Pollidreducer.isEdit,
    changedTittle: state.Pollidreducer.changedTittle,
    delete_option_success: state.Pollidreducer.delete_option_success,
    pollidData: state.Pollidreducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewdetailpolls);
