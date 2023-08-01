import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import moment from "moment";

const BasicForm = () => {
  const tablevalues = ["Saravanan", "C", "sara@gmail.com", "Test@1234","2222-12-1","10:12:25"];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tableData, setTableData] = useState([tablevalues]);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    const errors = {};
    if (firstName.length < 4) {
      errors.firstName = "First name should be at least 4 characters.";
    }
    if (lastName.length < 1) {
      errors.lastName = "Last name should be at least 1 character.";
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email address.";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.password =
        "Password should contain at least 1 lowercase, 1 uppercase, 1 special character, 1 number, and be at least 8 characters long.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // If validation passes, reset errors and add the form data to tableData
    setFormErrors({});
    const Date = moment().format("YYYY-MM-DD");
    const Time = moment().format("HH:mm:ss");
    const formData = [firstName, lastName, email, password, Date,Time];
    setTableData((prevTableData) => [...prevTableData, formData]);

    // Clear form fields after submission
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <Card color="transparent" shadow={false} className="bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-70 border border-gray-100" style={{ padding: 10 }}>
            <Typography color="gray" className="mt-1 font-bold">
              Enter your details to register.
            </Typography>
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleSubmit}
            >
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  label="FirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {formErrors.firstName && (
                  <Typography color="red" >
                    {formErrors.firstName}
                  </Typography>
                )}

                <Input
                  size="lg"
                  label="LastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {formErrors.lastName && (
                  <Typography color="red" >
                    {formErrors.lastName}
                  </Typography>
                )}

                <Input
                  size="lg"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formErrors.email && (
                  <Typography color="red" >
                    {formErrors.email}
                  </Typography>
                )}

                <Input
                  type="password"
                  size="lg"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {formErrors.password && (
                  <Typography color="red" >
                    {formErrors.password}
                  </Typography>
                )}
              </div>
              <Button className="mt-6" fullWidth type="submit" color="lightBlue">
                Submit
              </Button>
            </form>
          </Card>
        </div>

        <div className="col-span-8 " style={{ padding: 10, backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.25)", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.25)" }}>
          <Typography color="gray" className="mt-1 font-bold">
            Entered Data:
          </Typography>
          <table className="border-collapse w-full mt-8 bg-indigo-200 rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">S No</th>
                <th className="border border-gray-400 px-4 py-2">
                  First Name
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  Last Name
                </th>
                <th className="border border-gray-400 px-4 py-2">Email</th>
                <th className="border border-gray-400 px-4 py-2">
                  Password
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  Date
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-400 px-4 py-2">{data[0]}</td>
                  <td className="border border-gray-400 px-4 py-2">{data[1]}</td>
                  <td className="border border-gray-400 px-4 py-2">{data[2]}</td>
                  <td className="border border-gray-400 px-4 py-2"> true </td>
                  <td className="border border-gray-400 px-4 py-2">{data[4]}</td>
                  <td className="border border-gray-400 px-4 py-2">{data[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BasicForm;
