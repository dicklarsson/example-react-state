import * as React from "react";
import * as ReactDOM from "react-dom";

/*
    React hooks state: state should be immutiable

    Replace/reset state each time state "updates"

*/
function CustomerApp() {
  const [customers, setCustomers] = React.useState([
    { firstName: "Jennifer", lastName: "Andersson", id: 1 },
    { firstName: "Anna", lastName: "Bengtsson", id: 2 },
    { firstName: "David", lastName: "Bergwall", id: 3 },
  ]);
  const [dummyState, setDummyState] = React.useState(0);

  const onChange = (customer) => {
    /* 
      //Poor mans version, just change any state and the component will re-render 
      setDummyState(Date.now());
 
      */

      /* set state can be invoked with a function as argument, the functions first argument is the previous state */
      /* the reason the component re-renders is actually that we change the reference of the value of state 'customers' */

    setCustomers((oldCustomers) => {
      const obj = oldCustomers.find((c) => c.id === customer.id);
      const index = oldCustomers.indexOf(obj); 
      oldCustomers[index] = customer;
      //create a new object/reference by using a retarted map
      const newCustomers = oldCustomers.map((c) => c);
      return newCustomers;
    });
  };

  return <CustomersList customers={customers} onChange={onChange} />;
}

function CustomersList({ customers, onChange }) {
  const [sortBy, setSortBy] = React.useState("lastName");
  const s = (event) => {
    setSortBy(event.target.value);
  };

  const sorted = customers.sort(function (a, b) {
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
  });

  return (
    <div>
      <select onChange={s} value={sortBy}>
        <option value="firstName">Fist name</option>
        <option value="lastName">Last name</option>
      </select>
      <table className="table">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((customer) => (
            <CustomersListItem customer={customer} onChange={onChange} />
          ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(customers, null, 4)}</pre>
    </div>
  );
}

function CustomersListItem({ customer, onChange }) {
  return (
    <tr key={customer.id}>
      <td>{customer.firstName}</td>
      <td>
        <input
          type="text"
          value={customer.lastName}
          onChange={(event) => {
            customer.lastName = event.target.value;
            onChange(customer);
          }}
        ></input>
        <pre>{JSON.stringify(customer, null, 4)}</pre>
      </td>
    </tr>
  );
}

ReactDOM.render(<CustomerApp />, document.getElementById("app"));
