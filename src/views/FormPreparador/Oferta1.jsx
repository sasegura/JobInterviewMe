import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import diasSemanaHoras from '../../assets/json/horas.json';

const Oferta1 = () => {
    const [countries, setCountries] = useState(null);
    const [filteredCountries, setFilteredCountries] = useState(null);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [value5, setValue5] = useState(null);
    const [value6, setValue6] = useState(null);
    const [value7, setValue7] = useState(null);
    const [value8, setValue8] = useState(null);
    const [value9, setValue9] = useState('');
    const [value11, setValue11] = useState(null);
    const [value12, setValue12] = useState(null);
    const [value13, setValue13] = useState('');

    
    useEffect(() => {
        setCountries(diasSemanaHoras.data);
    }, []); 

    const searchCountry = (event) => {
        setTimeout(() => {
            let results = countries.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
            setFilteredCountries(results);
        }, 250);
    }

    return (
        <div>
            <div className="card">
                <div className="p-fluid p-grid">
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <InputText id="inputtext" value={value1} onChange={(e) => setValue1(e.target.value)} />
                            <label htmlFor="inputtext">Nombre de tu perfil</label>
                        </span>
                    </div>
                    
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <InputText id="lefticon" value={value2} onChange={(e) => setValue2(e.target.value)} />
                            <label htmlFor="lefticon">Left Icon</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label p-input-icon-right">
                            <i className="pi pi-spin pi-spinner" />
                            <InputText id="righticon" value={value3} onChange={(e) => setValue3(e.target.value)} />
                            <label htmlFor="righticon">Right Icon</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <AutoComplete value={value4} suggestions={filteredCountries} completeMethod={searchCountry} field="name" onChange={(e) => setValue4(e.value)} />
                            <label htmlFor="autocomplete">AutoComplete</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <Calendar id="calendar" value={value5} onChange={(e) => setValue5(e.value)} />
                            <label htmlFor="calendar">Calendar</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <Chips id="chips" value={value6} onChange={(e) => setValue6(e.value)} />
                            <label htmlFor="chips">Chips</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <InputMask id="inputmask" value={value7} onChange={(e) => setValue7(e.value)} mask="99/99/9999" slotChar="mm/dd/yyyy" />
                            <label htmlFor="inputmask">InputMask</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <InputNumber id="inputnumber" value={value8} onChange={(e) => setValue8(e.value)} />
                            <label htmlFor="inputnumber">InputNumber</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id="inputgroup" type="text" value={value9} onChange={(e) => setValue9(e.target.value)} />
                                <label htmlFor="inputgroup">InputGroup</label>
                            </span>
                        </div>
                    </div>
                    
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <Dropdown id="dropdown" value={value11} options={countries} onChange={(e) => setValue11(e.value)} optionLabel="name" />
                            <label htmlFor="dropdown">Dropdown</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <MultiSelect id="multiselect" value={value12} options={countries} onChange={(e) => setValue12(e.value)} optionLabel="name" />
                            <label htmlFor="multiselect">MultiSelect</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <InputTextarea id="textarea" value={value13} onChange={(e) => setValue13(e.target.value)} rows={3} />
                            <label htmlFor="textarea">Textarea</label>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Oferta1;