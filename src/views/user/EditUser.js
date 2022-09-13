import React, { useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { Button, Row, Col, Card, Form, InputGroup, Dropdown } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
// import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik, Formik, Field } from 'formik';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
// import CsLineIcons from 'cs-line-icons/CsLineIcons';
// import useCustomLayout from 'hooks/useCustomLayout';
import 'react-datepicker/dist/react-datepicker.css';
// import { useWindowSize } from 'hooks/useWindowSize';
import { toast } from 'react-toastify';
import { DEFAULT_PATHS } from '../../config';
import { GetAllArea } from '../../services/userservice';
import { LAYOUT } from '../../constants';

const EditUser = (props) => {
    const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;
    const history = useHistory();
    const states = props;
    const user = states.location.state;
    const ref = useRef(null);
    const [isChecked, setIsChecked] = useState(null);

    const title = 'Update Node Page';
    const description = 'An page for update the tree view node.';
    const breadcrumbs = [
        { to: ``, text: 'Home' },
        { to: `setting/usersetting`, text: 'User Setting' },
    ];

    const { currentUser, isLogin } = useSelector((state) => state.auth);
    const [valueState, setValueState] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getAllArea = () => {
        setLoading(true);
        let result = null;
        const GetAreas  =  GetAllArea(currentUser.token).then(function(response) {
            if(response) {
            // console.log(response);
            if(response.responseCode === 200) {
                toast.success(response.responseDesc, {
                    position: "top-right",
                    autoClose: 1000,
                });
                // console.log(response.responseData);
                result = response.responseData;
                // console.log(result);
                setData(result);
                setLoading(false);
            }else{  
                toast.error(response.responseDesc, {
                    position: "top-right",
                    autoClose: 1000,
                });

                // if(response.responseCode === 401) {
                //   // dispatch(setCurrentUser(''));
                //   const path = `${appRoot}/login`; 
                //   history.push(path);
                // }
            }
            }
        });
    };

    useEffect(() => {
        getAllArea();
    }, []);

    const escapeRegexCharacters = (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        if (escapedValue === '') {
            return [];
        }
        const regex = new RegExp(`^${escapedValue}`, 'i');
            return data.filter((product) => regex.test(product.name));
    };

    const changeInput = (event, { newValue }) => {
        setValueState(newValue);
    };

    const onSuggestionsFetchRequested = ({ value: val }) => {
        setSuggestions(getSuggestions(val));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion) => suggestion.name;

    const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

    const renderInputComponent = (props) => <input {...props} className="form-control" />;

    // console.log(user); 
    const initialValues = { 
        name: user.name, 
        flag_active: user.flag_active,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role,
        role_name: user.role_name,
        firstname: user.firstname,
        lastname: user.lastname,
        id_area: user.id_area,
        desc_area: user.desc_area,
        id_sub_area: user.id_sub_area,
        desc_sub_area: user.desc_sub_area,
    };
    const validationSchema = Yup.object().shape({
        id: Yup.string().required('Id Title is required'),
        title: Yup.string().required('Title is required'),
        desc: Yup.string().required('Description is required'),
        // startDate: Yup.string().required('Start date is required'),
        // dueDate: Yup.string().required('Due date is required'),
    });
    const onSubmit = (values) => {

    };
    const handleClickBackButton = () => {
        const path = `${appRoot}/setting/usersetting`; 
        // console.log(path);
        history.push(path);
    };
    const handleChecked = () => {
        setIsChecked(!isChecked);
    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors } = formik;

    return (
        <div className="App" style={{  }}>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    {/* Title Start */}
                    <section className="scroll-section" id="title">
                    <div className="page-title-container">
                        <h1 className="mb-0 pb-0 display-4">{title}</h1>
                        <BreadcrumbList items={breadcrumbs} />
                    </div>
                    </section>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2 className="small-title">Node Info</h2>
                    <Form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                    <Card className="mb-2">
                        <Card.Body className="p-3">
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">User Name</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <Form.Control type="text" name="name" id="name" value={values.name}  onChange={handleChange} readOnly={1}/>
                                    {errors.name  && touched.name && <div className="d-block invalid-tooltip">{errors.name}</div>}
                                </Col>
                            </Row>
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">First Name</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <Form.Control type="text" name="firstname" id="firstname" value={values.firstname}  onChange={handleChange}/>
                                    {errors.firstname  && touched.firstname && <div className="d-block invalid-tooltip">{errors.firstname}</div>}
                                </Col>
                            </Row>
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Last Name</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <Form.Control type="text" name="lastname" id="lastname" value={values.lastname}  onChange={handleChange}/>
                                    {errors.lastname  && touched.lastname && <div className="d-block invalid-tooltip">{errors.lastname}</div>}
                                </Col>
                            </Row>
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Role</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <Form.Control type="text" name="role_name" id="role_name" value={values.role_name}  onChange={handleChange}/>
                                    {errors.role_name  && touched.role_name && <div className="d-block invalid-tooltip">{errors.role_name}</div>}
                                </Col>
                            </Row>
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="3">
                                    <Form.Label className="col-form-label">Area</Form.Label>
                                </Col>
                                <Col lg="4" md="9" sm="9" >
                                    <Form.Control type="text" name="desc_area" id="desc_area" value={values.desc_area}  onChange={handleChange}/>
                                    {errors.desc_area  && touched.desc_area && <div className="d-block invalid-tooltip">{errors.desc_area}</div>}
                                </Col>
                                <Col lg="2" md="3" sm="3">
                                    <Form.Label className="col-form-label">Sub Area</Form.Label>
                                </Col>
                                <Col lg="4" sm="4" md="9" >
                                    <Form.Control type="text" name="desc_sub_area" id="desc_sub_area" value={values.desc_sub_area}  onChange={handleChange}/>
                                    {errors.desc_sub_area  && touched.desc_sub_area && <div className="d-block invalid-tooltip">{errors.desc_sub_area}</div>}
                                </Col>
                            </Row>
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Flag Active</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <Form.Check ref={ref} type="checkbox" className="mt-2" label="active" id="status" name="status" checked={isChecked !== null ? isChecked : values.flag_active} onChange={() => handleChecked()}/>
                                    {errors.status  && touched.status && <div className="d-block invalid-tooltip">{errors.status}</div>}
                                </Col>
                            </Row>
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Flag Active</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <Autosuggest
                                        suggestions={suggestions}
                                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                                        getSuggestionValue={getSuggestionValue}
                                        renderSuggestion={renderSuggestion}
                                        focusInputOnSuggestionClick={false}
                                        inputProps={{
                                            placeholder: 'Breads',
                                            value: valueState,
                                            onChange: changeInput,
                                        }}
                                        renderInputComponent={renderInputComponent}
                                    />
                                    
                                    {errors.status  && touched.status && <div className="d-block invalid-tooltip">{errors.status}</div>}
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Col lg="2" md="3" sm="4" />
                                <Col sm="8" md="9" lg="10">
                                    <div className="btn-group">
                                        <Button type="submit" variant="outline-primary" className="mb-1">Submit</Button>
                                        <Button id="backButton" name="backButton" type="button" variant="outline-warning" className="mb-1" onClick={() => handleClickBackButton()}>Back</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default EditUser;