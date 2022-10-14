import React, { useEffect, useState } from "react";
import { Row, Col, Card, Nav, Tab, Button } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT, MENU_BEHAVIOUR } from 'constants.js';
import { useSelector } from 'react-redux';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

import {
  InitialGoals,
  TreeGoals,
  TreeViewCluster,
  GetStats,
  GetLastModifiedDate,
} from "../../services/treeservice";

const Navlink = function(propss) { 
  const {role, clicked} = propss;
  // console.log(role);
  if(role != "viewer") {
    console.log('tes');
    return (
      <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer" eventKey="permissions" onClick={clicked}>
        <CsLineIcons icon="settings-1" className="me-2" size="17" />
        <span className="align-middle">Tree Admin</span>
      </Nav.Link>
    );
  }else{
    return ( <></> );
  }
};

const RowTimeLines = function(propss) {
  const {id_goals,title_goals, desc_goals, pic_goals, last_modified_date} = propss;
  return (
    <Row className="g-0" key={id_goals}>
      <Col xs="auto" className="sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
        <div className="w-100 d-flex sh-1" />
        <div className="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
          <div className="bg-gradient-light sw-1 sh-1 rounded-xl position-relative" />
        </div>
        <div className="w-100 d-flex h-100 justify-content-center position-relative">
          <div className="line-w-1 bg-separator h-100 position-absolute" />
        </div>
      </Col>
      <Col className="mb-4">
        <div className="h-100">
          <div className="d-flex flex-column justify-content-start">
            <div className="d-flex flex-column">
              <Button variant="link" className="p-0 pt-1 heading text-start">
                {title_goals}
              </Button>
              <div className="text-alternate">{last_modified_date}</div>
              <div className="text-muted mt-1">
                {/* Jujubes tootsie roll liquorice cake jelly beans pudding gummi bears chocolate cake donut. Jelly-o sugar plum fruitcake bonbon
                bear claw cake cookie chocolate bar. Tiramisu soufflé apple pie. */}
                {desc_goals} , last modified by {pic_goals}
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

const Home = () => { 
    const { currentUser, isLogin } = useSelector((state) => state.auth);
    const [initialGoals, setInitialGoals] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [dsSub, setSubs] = useState([]);
    const title = 'Tree Performance Modeler';
    const description = 'An empty home page with a boxed layout.';
    const breadcrumbs = [{ to: '', text: 'Home' }];
    // console.log(currentUser);
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Boxed, behaviour: MENU_BEHAVIOUR.Unpinned });

    const getInitialGoals = () => {
      let result = null;
      setLoading(true);
      GetStats(currentUser.token)
        .then(function (response) {
          if (response) {
            if (response.responseCode === 200) {
              result = response.responseData;
              console.log(result);
              setInitialGoals(result);
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const getTimeLine = () => {
      let result = null;
      setLoading(true);
      GetLastModifiedDate(currentUser.token)
        .then(function (response) {
          if (response) {
            if (response.responseCode === 200) {
              result = response.responseData;
              console.log(result);
              setSubs(result);
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };

    useEffect(() => {
      getInitialGoals();
      getTimeLine();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
          <HtmlHead title={title} description={description} />
          <Row>
            <Col>
              {/* Title Start */}
              <section className="scroll-section" id="title">
                {/* <div className="page-title-container">
                  <h1 className="mb-0 pb-0 display-4">{title}</h1>
                  <BreadcrumbList items={breadcrumbs} />
                </div>
                <Card className="mb-5" body>
                  <Card.Text>{description}</Card.Text>
                </Card> */}
                <Row className="g-5">
                  <Tab.Container id="profileStandard" defaultActiveKey="overview">
                    {/* Sidebar Start */}
                    <Col xl="4" xxl="3">
                      <h2 className="small-title">Profile</h2>
                      <Card className="mb-5">
                        <Card.Body>
                          <div className="d-flex align-items-center flex-column mb-4">
                            <div className="d-flex align-items-center flex-column">
                              <div className="sw-13 position-relative mb-3">
                                <img src="/img/profile/profile-12.gif" className="img-fluid rounded-xl" alt="thumb" />
                              </div>
                              <div className="h5 mb-0" style={{ textTransform: 'capitalize'}}>{currentUser.name}</div>
                              <div className="text-muted" style={{ textTransform: 'capitalize'}}>{currentUser.role}</div>
                              <div className="text-muted">
                                <CsLineIcons icon="pin" className="me-1" />
                                <span className="align-middle" style={{ textTransform: 'capitalize'}}>{currentUser.desc_area}, {currentUser.desc_sub_area}</span>
                              </div>
                            </div>
                          </div>
                          <Nav className="flex-column" activeKey="overview">
                            <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer" eventKey="overview">
                              <CsLineIcons icon="board-2" className="me-2" size="17" />
                              <span className="align-middle">Goals Stats</span>
                            </Nav.Link>
                            {/* <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer" eventKey="projects">
                              <CsLineIcons icon="suitcase" className="me-2" size="17" />
                              <span className="align-middle">Projects</span>
                            </Nav.Link>
                            <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer" eventKey="permissions">
                              <CsLineIcons icon="lock-off" className="me-2" size="17" />
                              <span className="align-middle">Permissions</span>
                            </Nav.Link>
                            <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer" eventKey="friends">
                              <CsLineIcons icon="heart" className="me-2" size="17" />
                              <span className="align-middle">Friends</span>
                            </Nav.Link>
                            <Nav.Link className="px-0 cursor-pointer" eventKey="about">
                              <CsLineIcons icon="logout" className="me-2" size="17" />
                              <span className="align-middle">Log out</span>
                            </Nav.Link> */}
                          </Nav>
                        </Card.Body>
                      </Card>
                    </Col>
                    {/* Sidebar End */}
                    {/* Content Start */}
                    <Col xl="8" xxl="9">
                      <Tab.Content>
                        <Tab.Pane eventKey="overview">
                          {/* Overview Tab Start */}

                          {/* Stats Start */}
                          <h2 className="small-title">Stats</h2>
                          <Row className="g-2 mb-5">
                            <Col sm="6" lg="3">
                              <Card className="hover-border-primary">
                                <Card.Body>
                                  <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                                    <span>Goals</span>
                                    <CsLineIcons icon="suitcase" className="text-primary" />
                                  </div>
                                  <div className="text-small text-muted mb-1" style={{ textTransform: 'uppercase'}}>{currentUser.desc_area}</div>
                                  <div className="cta-1 text-primary">{initialGoals.goals}</div>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col sm="6" lg="3">
                              <Card className="hover-border-primary">
                                <Card.Body>
                                  <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                                    <span>Sub Goals</span>
                                    <CsLineIcons icon="check-square" className="text-primary" />
                                  </div>
                                  <div className="text-small text-muted mb-1" style={{ textTransform: 'uppercase'}}>{currentUser.desc_sub_area}</div>
                                  <div className="cta-1 text-primary">{initialGoals.sub_goals}</div>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col sm="6" lg="3">
                              <Card className="hover-border-primary">
                                <Card.Body>
                                  <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                                    <span>Goals w/ Clusters</span>
                                    <CsLineIcons icon="file-empty" className="text-primary" />
                                  </div>
                                  <div className="text-small text-muted mb-1">RECENT</div>
                                  <div className="cta-1 text-primary">{initialGoals.cluster_goals}</div>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col sm="6" lg="3">
                              <Card className="hover-border-primary">
                                <Card.Body>
                                  <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                                    <span>Goals w/ Indikator</span>
                                    <CsLineIcons icon="activity" className="text-primary" />
                                  </div>
                                  <div className="text-small text-muted mb-1">RECENT</div>
                                  <div className="cta-1 text-primary">{initialGoals.indikator_goals}</div>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                          {/* Stats End */}
                          {/* Timeline Start */}
                          <h2 className="small-title">Timeline</h2>
                          <Card className="mb-5">
                            <Card.Body>
                            {dsSub.map((row, idx) => {
                              delete row.pass;
                              return(
                                <RowTimeLines 
                                  id_goals = {row.id_goals}
                                  title_goals = {row.title_goals}
                                  desc_goals = {row.desc_goals}
                                  pic_goals = {row.pic_goals}
                                  last_modified_date = {row.last_modified_date}
                                />
                              )
                              })
                              }
                            </Card.Body>
                          </Card>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Tab.Container>
                </Row>
              </section>
              {/* Title End */}
            </Col>
          </Row>
        </>
      );

}

export default Home;
