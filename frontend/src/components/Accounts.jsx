import React from "react";
import data from '../datas/data.json';

function Accounts() {
    return(
        <>
        <h2 className="sr-only">Accounts</h2>
        {data.profile.map((account, index) => (
            <section className="account" key={index}>
            <div className="account-content-wrapper">
              <h3 className="account-title">{account.title}</h3>
              <p className="account-amount">{account.amount}</p>
              <p className="account-amount-description">{account.description}</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section> 
        ))}
        </>
    )
}

export default Accounts;