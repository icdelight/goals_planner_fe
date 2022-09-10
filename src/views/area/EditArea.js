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

const EditArea = (props) => {
    const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;
    const history = useHistory();
    const states = props;
    const area = states.location.state;
    const ref = useRef(null);
    const [isChecked, setIsChecked] = useState(null);

    const title = 'Update Area Page';
    const description = 'An page for update the area.';
    const breadcrumbs = [
        { to: ``, text: 'Home' },
        { to: `setting/areasetting`, text: 'Area Setting' },
    ];

    const { currentUser, isLogin } = useSelector((state) => state.auth);

    const initialValues = { 
        id_area: area.idarea,
        desc_area: area.descarea,
        id_sub_area: area.idsubarea,
        desc_sub_area: area.descsubarea,
        id_parent_area: area.idparentarea,
        desc_parent_area: area.descparentarea,
        active: area.active,
    };
    const validationSchema = Yup.object().shape({
        id_area: Yup.string().required('Area is required'),
        id_sub_area: Yup.string().required('Sub Area is required'),
        id_parent_area: Yup.string().required('Parent Area is required'),
    });
    const onSubmit = (values) => {

    };
    const handleClickBackButton = () => {
        const path = `${appRoot}/setting/areasetting`; 
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
                                    <Form.Label className="col-form-label">Area</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <Form.Control type="text" name="name" id="name" value={values.desc_area}  onChange={handleChange} readOnly={1}/>
                                    {errors.desc_area  && touched.desc_area && <div className="d-block invalid-tooltip">{errors.desc_area}</div>}
                                </Col>
                            </Row>
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Sub Area</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <Form.Control type="text" name="name" id="name" value={values.desc_sub_area}  onChange={handleChange}/>
                                    {errors.desc_sub_area  && touched.desc_sub_area && <div className="d-block invalid-tooltip">{errors.desc_sub_area}</div>}
                                </Col>
                            </Row>
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Parent Area</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <Form.Control type="text" name="name" id="name" value={values.desc_parent_area}  onChange={handleChange} readOnly={values.id_sub_area == 1? 1 : 0}/>
                                    {errors.desc_parent_area  && touched.desc_parent_area && <div className="d-block invalid-tooltip">{errors.desc_parent_area}</div>}
                                </Col>
                            </Row>
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Flag Active</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <Form.Check ref={ref} type="checkbox" className="mt-2" label="active" id="status" name="status" checked={isChecked !== null ? isChecked : values.active} onChange={() => handleChecked()}/>
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

export default EditArea;