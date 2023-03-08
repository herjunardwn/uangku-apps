import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

class ModalCreate extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      desc: "",
      nominal: "",
      tanggal: "",
      category: "",
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buttonAddItem = this.buttonAddItem.bind(this);
  }
  handleClose() {
    this.setState({
      show: false,
    });
  }

  handleShow() {
    this.setState({
      show: true,
      category: this.props.category,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  buttonAddItem() {
    const Datas = {
      desc: this.state.desc,
      nominal: parseInt(this.state.nominal),
      tanggal: this.state.tanggal,
      category: this.state.category,
    };

    const tambahItem = this.props.action;
    tambahItem(Datas);
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <>
        <button onClick={this.handleShow} className={this.props.variant}>
          {this.props.text} <i className={this.props.icon}></i>
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modalHeading}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* inputan tombol */}
            <div className="mb-3">
              <label className="form-label">Deskripsi</label>
              <input type="text" className="form-control" placeholder="Masukan Deskripsi" name="desc" value={this.state.desc} onChange={this.handleChange} />
            </div>
            {/* inputan nominal */}
            <div className="mb-3">
              <label className="form-label">Nominal</label>
              <input type="number" className="form-control" placeholder="Masukan Nominal" name="nominal" value={this.state.nominal} onChange={this.handleChange} />
            </div>
            {/* inputan tanggal */}
            <div className="mb-3">
              <label className="form-label">Tanggal</label>
              <input type="date" className="form-control" placeholder="Masukan Tanggal" name="tanggal" value={this.state.tanggal} onChange={this.handleChange} />
            </div>
            {/* inputan tanggal */}
            <div className="mb-3">
              <label className="form-label" hidden>
                Category
              </label>
              <input type="text" className="form-control w-25 text-center" placeholder="Masukan Deskripsi" name="tanggal" value={this.state.category} onChange={this.handleChange} disabled />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className={this.state.category == "IN" ? "btn-purple px-3 py-2" : "btn-pink px-3 py-2"} onClick={this.buttonAddItem}>
              SAVE
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ModalCreate;
