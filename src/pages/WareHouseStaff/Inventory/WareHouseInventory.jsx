import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./WareHouseInventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import PresentaionCard from "../../../components/Card/PresentaionCard";
import inventoryImage from "../../../assets/bigIcon/inventoryIcon.png";
import { useLocation, useNavigate } from "react-router-dom";
import WareHouseSideNavigation from "../Navigation/WareHouseSideNavigation";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import Loading from "../../../components/Loading/Loading";
import { convertDate, scrollToTop } from "../../../utils/HelperFunc"
import MessageContext from "../../../context/Message/MessageContext";
import AnalysisContext from "../../../context/Analysis/AnalysisContext";

function WareHouseInventory() {
  const navigate = useNavigate();
  const location = useLocation();

  const { getInventoryItems, getItemsData, getItemsIsLoading } =
  useContext(InventoryItemContext);

  const { ProcessAnalysis, itemDataAnalysis } =
  useContext(AnalysisContext);

  const { navigationMessages, setnavigationMessages } = useContext(MessageContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getInventoryItems();
    setFilteredData(getItemsData);
  }, []);

  useEffect(() => {
    ProcessAnalysis(getItemsData, 'items');
  }, [getItemsIsLoading]); 

  const {value, trend} = itemDataAnalysis

  useEffect(() => {
    handleFilterSortSearch();
  }, [filterBy, sortBy, searchTerm, getItemsData]);

  useEffect(() => {
    if (location.state?.message || navigationMessages) {
      scrollToTop();
      const redirectMessage = location.state?.message;
      handleComfirmationPopUps(redirectMessage || navigationMessages, "bg-success");
      navigate(location.pathname, { replace: true, state: {} });
      setnavigationMessages('')
    }
  }, []);

  const filterOption = useMemo(() =>[
    {
      pk: 1,
      type: "All",
    },
    {
      pk: 2,
      type: "office_supplies",
    },
  ], []);

  const sortOption = useMemo(() =>[
    {
      pk: 1,
      type: "ascending",
    },
    {
      pk: 2,
      type: "descending",
    },
  ], []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterSortSearch = () => {
    let filtered = [...getItemsData];

    if (filterBy && filterBy !== 'All') {
      filtered = filtered.filter((item) => item.category === filterBy);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "ascending") {
          return a.name.localeCompare(b.name); 
        } else {
          return b.name.localeCompare(a.name); 
        }
      });
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleGenerateReport = () => {
    navigate('/GenerateInventory')
  }
  const handleAdditem = () => {
    navigate("/AddNewItem");
  }
  const handleItemDetail = (pk) => {
    navigate(`/ItemDetail/${pk}`);
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <WareHouseSideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
        {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          <TitleHeader text={"Inventory Management"} />
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search Searchstyle={"seachContentBar"} searchText={'Search Inventory...'} onSearchChange={handleSearchChange}/>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12} className="mb-2">
              <PresentaionCard
                title={"Total Items"}
                image={inventoryImage}
                figure={getItemsData ? getItemsData.length : 0}
                margin={`${trend === 'up' ? '↑' : trend === 'down' ? '↓' : '~'} ${value}`}
                marginColor={trend === 'up' ? 'text-success': trend === 'down' ? 'text-danger' : 'text-primary'}
              />
            </Col>
            <Col lg={6} md={12} xl={4} sm={12} xs={12}>
              <PresentaionCard
                title={"Low Stock Alerts"}
                image={inventoryImage}
                figure={"46"}
                margin={"↓"}
                marginColor={"red"}
              />
            </Col>
          </Row>
          <Row className="d-lg-none mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <PrimaryButton
                Primaryicon={faAdd}
                text={"Add Item"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleAdditem()}
              />
            </Col>
          </Row>
          <Row className="d-lg-none ">
            <Col className="d-flex justify-content-between ms-auto gap-3">
              <Filter
              Filterstyle={"responsive"}
                optionTitle={"Filter by"}
                options={filterOption}
                defult={"Ramdom"}
                onSelect={(value) => setFilterBy(value)}
              />
              <Filter
              Filterstyle={"responsive"}
                optionTitle={"Sort by"}
                options={sortOption}
                defult={"Ramdom"}
                onSelect={(value) => setSortBy(value)}
              />
            </Col>
          </Row>
          <Row className="d-none d-lg-flex">
            <Col xl={2}>
            <Filter
                optionTitle={"Filter by"}
                options={filterOption}
                defult={"Ramdom"}
                onSelect={(value) => setFilterBy(value)}
              />
            </Col>
            <Col xl={2}>
            <Filter
                optionTitle={"Sort by"}
                options={sortOption}
                defult={"Ramdom"}
                onSelect={(value) => setSortBy(value)}
              />
            </Col>
            <Col xl={6}>
            <PrimaryButton
                text={"Generate Inventory Report"}
                Primarystyle={"WareHouseGenerateInventoryButton w-100"}
                clickEvent={() => handleGenerateReport()}
              />
            </Col>
            <Col xl={2}>
            <PrimaryButton
                Primaryicon={faAdd}
                text={"Add Item"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleAdditem()}
              />
            </Col>
          </Row>
          <Container className="ListContainer">
            {!getItemsIsLoading ? (
              filteredData && filteredData.length > 0 ? (
                filteredData.map((Item) => (
                  <Row
                    key={Item.id}
                    className="UserListRow my-2 py-2 align-items-center"
                  >
                    <Col xs={9} className="d-flex gap-3">
                      <Image
                        src={Item.image}
                        rounded
                        width="50"
                        height="50"
                      />
                      <div>
                        <h6>{Item.name}</h6>
                        <h6 className="fs-6">
                        INV-{Item.id}
                          <span className="text-muted">
                            | {Item.category} | {''}
                            <span className="d-none d-lg-inline me">
                              {Item.brand} | {`$${Item.unit_cost}`} | {Item.quantity} {''}
                              <span
                                className={
                                  Item.quantity > 35
                                    ? "text-success"
                                    : Item.quantity < 1
                                    ? "text-danger"
                                    : "text-warning"
                                }
                              >
                                {Item.quantity > 35
                                  ? "| In stock"
                                  : Item.quantity < 1
                                  ? "| Out of stock"
                                  : "| Low on stock"}
                              </span> | {''}
                               {Item.supplier} | {''}
                              <span
                                className={
                                  Item.status === "pending"
                                    ? "text-danger"
                                    : "text-success"
                                }
                              >
                                {Item.status}
                              </span> | {''}
                              {convertDate(Item.created_at)}
                            </span>
                          </span>
                        </h6>
                      </div>
                    </Col>
                    <Col xs={3} className="d-flex justify-content-end gap-2">
                      <PrimaryButton
                        text={"Edit"}
                        Primarystyle={"UserViewButton d-none d-lg-block"}
                        clickEvent={() => null}
                      />
                      <PrimaryButton
                        text={"View details"}
                        Primarystyle={"schoolViewButton"}
                        clickEvent={() => handleItemDetail(Item.id)}
                      />
                    </Col>
                  </Row>
                ))
              ) : (
                <NonAvaliable
                  textMessage={
                    "Sorry, there is currently no available item! 😥"
                  }
                  imageWidth={"300px"}
                />
              )
            ) : (
              <Container className="d-flex justify-content-center align-items-center h-50">
                <Loading loading={getItemsIsLoading} />
              </Container>
            )}
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default WareHouseInventory;
