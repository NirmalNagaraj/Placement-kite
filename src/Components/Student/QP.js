import React, { useState } from "react";

export default function QP() {
    const [companyName, setCompanyName] = useState('');
    const [round, setRound] = useState('');
    const [solution, setSolution] = useState(null);

    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
    };

    const handleRoundChange = (event) => {
        setRound(event.target.value);
    };

    const handleSolutionChange = (event) => {
        const file = event.target.files[0];
        setSolution(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform form submission or validation here
        console.log('Company Name:', companyName);
        console.log('Round:', round);
        console.log('Solution File:', solution);
    };

    return (
        <div>
            <h2>Question Paper Upload Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="companyName">Company Name:</label>
                    <input
                        type="text"
                        id="companyName"
                        value={companyName}
                        onChange={handleCompanyNameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="round">Round:</label>
                    <input
                        type="text"
                        id="round"
                        value={round}
                        onChange={handleRoundChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="solution">Upload Solution:</label>
                    <input
                        type="file"
                        id="solution"
                        onChange={handleSolutionChange}
                        accept=".pdf,.jpeg,.jpg,.png"
                        required
                    />
                    <p>(Accepted formats: PDF, JPEG, JPG, PNG)</p>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
