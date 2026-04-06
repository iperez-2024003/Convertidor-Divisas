import { useState } from "react"
import axios from "axios"
import "./convertidor.css"

export const Convertidor = () => {

    const [formData, setFormData] = useState({
        from: "",
        to: "",
        amount: "",
    })
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const currencyCode = ['GTQ', 'USD', 'EUR', 'MXN']


    const handleChange = (evento) => {
        console.log(evento)
        const { name, value } = evento.target;
        console.log(name, value)
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleSubmit = async (evento) => {
        evento.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/v1/convert", 
                formData
            );
            setResult(response.data);
            setError('');
        } catch (error) {
            setError(
                'Error'),
                error.response ? error?.response.data : error?.message
            setResult(null);
        }
    }



    return (
        <div>
            <section className="converter">
                <form onSubmit={handleSubmit}>
                    <select
                        name="from"
                        value={formData.from}
                        onChange={handleChange}
                        className='input'
                    >
                        <option value="">Selecciona la moneda de origen</option>
                        {currencyCode.map((code) => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                    </select>
                    <select
                        name="to"
                        value={formData.to}
                        onChange={handleChange}
                        className='input'
                    >
                        <option value="">Selecciona la moneda de destino</option>
                        {currencyCode.map((code) => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                    </select>
                    <input
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Escribe la cantidad o montoa convertir"
                        type="number"
                        className='input'
                    />
                    <button type="submit" className='submit-btn'>
                        Convertir
                    </button>
                </form>
                {result && (
                    <div className="result">
                        <p>Total de la conversion: { result.conversionAmount } { result.target }</p>
                        <p>Tasa de cambio: { result.conversionRate }</p>
                    </div>
                )}    
                {error && <p className="error">{error}</p>}
            </section>
        </div>
    )
}
