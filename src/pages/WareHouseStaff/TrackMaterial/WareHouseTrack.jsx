import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./WareHouseTrack.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import inventoryListImage from "../../../assets/bigIcon/inventoryList.png";
import { useNavigate, useLocation } from "react-router-dom";
import WareHouseSideNavigation from "../Navigation/WareHouseSideNavigation";
import TrackingContext from "../../../context/Tracking/TrackingContext";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import Loading from "../../../components/Loading/Loading";
import { convertDate, scrollToTop } from "../../../utils/HelperFunc";

function WareHouseTrack() {
  const navigate = useNavigate();
  const location = useLocation();

  const { getTrackings, getTrackingsData, getTrackingsIsLoading } =
    useContext(TrackingContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getTrackings();
    setFilteredData(getTrackingsData);
  }, []);

  useEffect(() => {
    handleFilterSortSearch();
  }, [filterBy, sortBy, searchTerm, getTrackingsData]);

  useEffect(() => {
    if (location.state?.message) {
      scrollToTop();
      const redirectMessage = location.state?.message;
      handleComfirmationPopUps(redirectMessage, "bg-success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filterOption = useMemo(
    () => [
      {
        pk: 1,
        type: "All",
      },
      {
        pk: 2,
        type: "pending",
      },
      {
        pk: 3,
        type: "active",
      },
    ],
    []
  );

  const sortOption = useMemo(
    () => [
      {
        pk: 1,
        type: "ascending",
      },
      {
        pk: 2,
        type: "descending",
      },
    ],
    []
  );

  const filterData = [
    {
      pk: 1,
      type: "Date",
    },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterSortSearch = () => {
    let filtered = [...getTrackingsData];

    if (filterBy && filterBy !== "All") {
      filtered = filtered.filter((item) => item.status === filterBy);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "ascending") {
          return a.item_name.localeCompare(b.item_name);
        } else {
          return b.item_name.localeCompare(a.item_name);
        }
      });
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleAddMovement = () => {
    navigate("/WareHouseAddMovement");
  };
  const users = [
    {
      id: 1,
      itemId: "INV-001",
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      price: "$0.25",
      quantity: 50,
      location: "Aisle 2, Shelf C1",
      status: "Active",
      joinDate: "2024-05-18",
    },
    {
      id: 2,
      itemId: "INV-001",
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      price: "$0.25",
      quantity: 24,
      location: "Aisle 2, Shelf C1",
      status: "Active",
      joinDate: "2024-05-18",
    },
    {
      id: 3,
      itemId: "INV-001",
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      price: "$0.25",
      quantity: 0,
      location: "Aisle 2, Shelf C1",
      status: "Active",
      joinDate: "2024-05-18",
    },
    // Add more users as needed
  ];
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <WareHouseSideNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          <TitleHeader text={"Track Materials"} />
          <Row className="mb-4">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search
                Searchstyle={"seachContentBar"}
                searchText={"Search Materials..."}
                onSearchChange={handleSearchChange}
              />
            </Col>
          </Row>
          <Row className="d-lg-none mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <PrimaryButton
                Primaryicon={faAdd}
                text={"Add Item"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleAddMovement()}
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
            <Col className="d-flex justify-content-end ms-auto gap-3">
              <Filter
                optionTitle={"Filter by"}
                options={filterOption}
                defult={"Ramdom"}
                onSelect={(value) => setFilterBy(value)}

              />
              <Filter
                optionTitle={"Sort by"}
                options={sortOption}
                defult={"Ramdom"}
                onSelect={(value) => setSortBy(value)}
              />
              <PrimaryButton
                Primaryicon={faAdd}
                text={"Add Item"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleAddMovement()}
              />
            </Col>
          </Row>
          <Container className=" ListContainer">
            {!getTrackingsIsLoading ? (
              filteredData && filteredData.length > 0 ? (
                filteredData.map((Item) => (
                  <Row
                    key={Item.id}
                    className="UserListRow my-2 py-2 align-items-center"
                  >
                    <Col xs={9} md={9} sm={9} lg={9} className="d-flex gap-3">
                      <Image
                        src={inventoryListImage}
                        rounded
                        width="50"
                        height="50"
                      />
                      <div>
                        <h6>{Item.item_name}</h6>
                        <h6 className="fs-6">
                          {" "}
                          {Item.id}
                          <span className="text-muted wareHouserCategoryText">
                            {" "}
                            | {Item.category}{" "} 
                            <span className="d-none d-lg-inline me">
                            |  {Item.item_description} | {Item.action} | {Item.brand} | 
                              {" "}<span className={
                                  Item.priority === 'low'
                                    ? "text-danger"
                                    : "text-success"
                                }>
                                  {Item.priority}
                              </span>{" "}
                              &nbsp;| &nbsp; {Item.address} | &nbsp;
                              <span
                                className={
                                  Item.status === "pending"
                                    ? "text-danger"
                                    : "text-success"
                                }
                              >
                                {" "}
                                {Item.status}
                              </span>{" "}
                              | {convertDate(Item.created_at)}
                            </span>{" "}
                          </span>
                        </h6>
                      </div>
                    </Col>
                    <Col
                      xs={3}
                      md={3}
                      sm={3}
                      lg={3}
                      className="d-flex justify-content-end gap-2"
                    >
                      <PrimaryButton
                        text={"Track"}
                        Primarystyle={"schoolViewButton "}
                        clickEvent={()=> null}
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
                <Loading loading={getTrackingsIsLoading} />
              </Container>
            )}
          </Container>
          <TitleHeader
            text={"Movement Log"}
            headerTextStyle={"headerTextStyle"}
          />
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search
                Searchstyle={"seachContentBar"}
                searchText={"Search Log..."}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default WareHouseTrack;
