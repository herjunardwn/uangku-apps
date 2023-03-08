import React, { Component } from "react";
import "./App.css";
import ModalCreate from "./ModalCreate";
import Alert from "./Alert";

class App extends Component {
  constructor() {
    super();
    this.state = {
      sisaUang: 0,
      persentase: 0,
      pemasukan: 0,
      pengeluaran: 0,
      transaksiIn: 0,
      transaksiOut: 0,
      summary: [
        // {
        //   desc: "Menerima Gaji",
        //   tanggal: "03 Maret 2023",
        //   nominal: 10000,
        //   category: "IN",
        // },
        // {
        //   desc: "Belanja",
        //   tanggal: "05 Maret 2023",
        //   nominal: 10000,
        //   category: "OUT",
        // },
      ],
    };
    this.tambahItem = this.tambahItem.bind(this);
    this.hitungTotal = this.hitungTotal.bind(this);
  }

  tambahItem(obj) {
    const newData = [...this.state.summary, obj];
    // pemasukan
    const uangIN = newData.filter((item) => item.category == "IN");
    const jumlahUangIN = uangIN.map((jml) => jml.nominal);
    const totalUangIN = jumlahUangIN.reduce((total, num) => total + num, 0);

    // pengeluaran
    const uangOUT = newData.filter((item) => item.category == "OUT");
    const jumlahUangOUT = uangOUT.map((jml) => jml.nominal);
    const totalUangOUT = jumlahUangOUT.reduce((total, num) => total + num, 0);

    this.setState({
      pemasukan: totalUangIN,
      transaksiIn: jumlahUangIN.length,
      pengeluaran: totalUangOUT,
      transaksiOut: jumlahUangOUT.length,
      sisaUang: totalUangIN - totalUangOUT,
      persentase: ((totalUangIN - totalUangOUT) / totalUangIN) * 100,
      summary: newData,
    });
  }

  hitungTotal() {
    // pemasukan
    const uangIN = this.state.summary.filter((item) => item.category == "IN");
    const jumlahUangIN = uangIN.map((jml) => jml.nominal);
    const totalUangIN = jumlahUangIN.reduce((total, num) => total + num);

    // pengeluaran
    const uangOUT = this.state.summary.filter((item) => item.category == "OUT");
    const jumlahUangOUT = uangOUT.map((jml) => jml.nominal);
    const totalUangOUT = jumlahUangOUT.reduce((total, num) => total + num);

    this.setState({
      pemasukan: totalUangIN,
      transaksiIn: jumlahUangIN.length,
      pengeluaran: totalUangOUT,
      transaksiOut: jumlahUangOUT.length,
      sisaUang: totalUangIN - totalUangOUT,
      persentase: ((totalUangIN - totalUangOUT) / totalUangIN) * 100,
    });
  }

  componentDidMount() {
    if (this.state.summary.length < 1) {
      <Alert />;
    } else {
      this.hitungTotal();
    }
  }

  render() {
    return (
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="fw-bold">UANGKU APPS</h1>
            <hr className="w-50 mx-auto" />
            <h2 className="fw-bold">Rp. {this.state.sisaUang},-</h2>
            <span className="title-md">Persentase sisa uang {this.state.persentase}%</span>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-6">
            <div className="card-wrapper p-4">
              <div className="icon-wrapper-in mb-1">
                <i className="bi bi-wallet2"></i>
              </div>
              <span className="title-sm text-light">Pemasukan</span>
              <h3 className="fw-semibold">Rp. {this.state.pemasukan},-</h3>
              <div>
                <span className="title text-purple title-sm fw-semibold">{this.state.transaksiIn}</span>
                <span className="title title-sm text-light"> Transaksi</span>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="card-wrapper p-4">
              <div className="icon-wrapper-out mb-1">
                <i className="bi bi-cash-stack"></i>
              </div>
              <span className="title-sm text-light">Pengeluaran</span>
              <h3 className="fw-semibold">Rp. {this.state.pengeluaran},-</h3>
              <div>
                <span className="title text-purple title-sm fw-semibold">{this.state.transaksiOut}</span>
                <span className="title title-sm text-light"> Transaksi</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col d-flex justify-content-between align-items-center flex-wrap">
            <h4 className="fw-semibold">Ringkasan Transaksi</h4>
            <div className="btn-wrapper d-flex gap-2">
              <ModalCreate action={this.tambahItem} category="IN" variant="btn-purple px-3 py-2" text="Pemasukan" icon="bi bi-plus-circle-fill" modalHeading="Tambah Pemasukan" />
              <ModalCreate action={this.tambahItem} category="OUT" variant="btn-pink px-3 py-2" text="Pengeluaran" icon="bi bi-dash-circle-fill" modalHeading="Pengeluaran Anda" />
            </div>
          </div>
        </div>

        <div className="row mt-4">
          {this.state.summary.length < 1 && <Alert />}

          {this.state.summary.map((sum, index) => {
            return (
              <div key={index} className="col-12 d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-3 align-items-end">
                  <div className={sum.category == "IN" ? "icon-wrapper-in" : "icon-wrapper-out"}>
                    <i className={sum.category == "IN" ? "bi bi-wallet2" : "bi bi-bag-dash"}></i>
                  </div>

                  <div className="transaction d-flex flex-column">
                    <h6>{sum.desc}</h6>
                    <span className="title-sm">{sum.tanggal}</span>
                  </div>
                </div>

                <h5 className={sum.category == "IN" ? "text-money-in" : "text-money-out"}>Rp. {sum.nominal}</h5>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
