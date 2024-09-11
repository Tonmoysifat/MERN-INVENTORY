import React, {Fragment, useEffect, useRef} from 'react';
import {Toaster} from "react-hot-toast";
import {Accordion, Container, Navbar} from "react-bootstrap";
import {AiOutlineBank, AiOutlineLogout, AiOutlineMenu, AiOutlineUnorderedList, AiOutlineUser} from "react-icons/ai";
import {getUserDetails} from "../../helper/SessoinHelper.js";
import logo from "../../assets/images/Logo.svg"
import {RiDashboardLine} from "react-icons/ri";
import {BsBagPlus, BsBagX, BsBox, BsCartPlus, BsCircle, BsGraphUp, BsPeople} from "react-icons/bs";
import {TbTruckDelivery} from "react-icons/tb";
import {IoCreateOutline} from "react-icons/io5";
import {LogoutRequest, ProfileDetailsRequest} from "../../apiRequest/UserApiRequest.js";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const MasterLayout = (props) => {
    let contentRef, sideNavRaf, topNavRef = useRef()
    useEffect(() => {
        (async () => {
            await ProfileDetailsRequest()
        })()
    }, []);
    const ProfileData = useSelector((state) => state.user.value)
    const MenuBarClickHandler = () => {
        let sideNav = sideNavRaf
        let content = contentRef
        let topNav = topNavRef
        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
            topNav.classList.remove("top-nav-open");
            topNav.classList.add("top-nav-close");
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
            topNav.classList.add("top-nav-open");
            topNav.classList.remove("top-nav-close");
        }
    }

    const isSideBarAccordionActive = () => {
        let urlList = []
        sideBarItems.map((items) => {
            urlList.push(
                items.subMenu.map((subItems) => {
                    return subItems?.url
                })
            )
        })
        return urlList.findIndex((items) => items.includes(window.location.pathname))
    }
    const sideBarItems = [
        {
            title: "Dashboard",
            icon: <RiDashboardLine className="side-bar-item-icon"/>,
            url: "/",
            subMenu: [],
        },
        {
            title: "Customer",
            icon: <BsPeople className="side-bar-item-icon"/>,
            url: "/Customer",
            subMenu: [
                {
                    title: "New Customer",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/new-customer",
                },
                {
                    title: "Customer List",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/customer-list",
                },
            ],
        },
        {
            title: "Supplier",
            icon: <TbTruckDelivery className="side-bar-item-icon"/>,
            url: "/Supplier",
            subMenu: [
                {
                    title: "New Supplier",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/new-supplier",
                },
                {
                    title: "Supplier List",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/supplier-list",
                },
            ],
        },
        {
            title: "Expense",
            icon: <AiOutlineBank className="side-bar-item-icon"/>,
            url: "/Expense",
            subMenu: [
                {
                    title: "New Expense Type",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/new-expense-type",
                },
                {
                    title: "Expense Type List",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/expense-type-list",
                },
                {
                    title: "New Expense",
                    icon: <IoCreateOutline size={16} className="side-bar-subitem-icon"/>,
                    url: "/new-expense",
                },
                {
                    title: "Expense List",
                    icon: (
                        <AiOutlineUnorderedList
                            size={16}
                            className="side-bar-subitem-icon"
                        />
                    ),
                    url: "/expense-list",
                },
            ],
        },
        {
            title: "Product",
            icon: <BsBox className="side-bar-item-icon"/>,
            url: "/Product",
            subMenu: [
                {
                    title: "New Brand",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/new-brand",
                },
                {
                    title: "Brand List",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/brand-list",
                },
                {
                    title: "New Category",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/new-category",
                },
                {
                    title: "Category List",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/category-list",
                },
                {
                    title: "New Product",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/new-product",
                },
                {
                    title: "Product List",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/product-list",
                },
            ],
        },
        {
            title: "Purchase",
            icon: <BsBagPlus className="side-bar-item-icon"/>,
            url: "/Purchase",
            subMenu: [
                {
                    title: "New Purchase",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/new-purchase",
                },
                {
                    title: "Purchase List",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/purchase-list",
                },
            ],
        },
        {
            title: "Sale",
            icon: <BsCartPlus className="side-bar-item-icon"/>,
            url: "/Sale",
            subMenu: [
                {
                    title: "New Sale",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/new-sale",
                },
                {
                    title: "Sale List",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/sale-list",
                },
            ],
        },
        {
            title: "Return",
            icon: <BsBagX className="side-bar-item-icon"/>,
            url: "/Return",
            subMenu: [
                {
                    title: "New Return",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/new-return",
                },
                {
                    title: "Return List",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/return-list",
                },
            ],
        },
        {
            title: "Report",
            icon: <BsGraphUp className="side-bar-item-icon"/>,
            url: "/Report",
            subMenu: [
                {
                    title: "Sale Report",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/sale-report",
                },
                {
                    title: "Return Report",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/return-report",
                },
                {
                    title: "Purchase Report",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/purchase-report",
                },
                {
                    title: "Expense Report",
                    icon: <BsCircle size={16} className="side-bar-subitem-icon"/>,
                    url: "/expense-report",
                },
            ],
        },
    ];
    const onLogout = async () => {
        await LogoutRequest()
        window.location.href = "/login"
    }

    return (
        <Fragment>
            <Toaster position="top-center"/>
            <Navbar className={"fixed-top px-0"}>
                <Container fluid={true}>
                    <Navbar.Brand>
                        <div ref={(div) => {
                            topNavRef = div
                        }} className="top-nav-open">
                            <h4 className="text-white m-0 p-0">
                                <a onClick={MenuBarClickHandler}>
                                    <AiOutlineMenu/>
                                </a>
                            </h4>
                        </div>
                    </Navbar.Brand>
                    <div className="float-right h-auto d-flex align-items-center">
                        <div className="user-dropdown">
                            <img
                                className="icon-nav-img icon-nav"
                                src={ProfileData['photo'] === "" ? "https://image.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-260nw-2281862025.jpg" : ProfileData['photo']}
                                alt="proImg"
                            />
                            <div className="user-dropdown-content ">
                                <div className="mt-4 text-center">
                                    <img
                                        className="icon-nav-img"
                                        src={ProfileData['photo'] === "" ? "https://image.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-260nw-2281862025.jpg" : ProfileData['photo']}
                                        alt="proImg"
                                    />
                                    <h6>{ProfileData["firstName"]}</h6>
                                    <hr className="user-dropdown-divider  p-0"/>
                                </div>
                                <NavLink to="/profile" className="side-bar-item">
                                    <AiOutlineUser/>
                                    <span className="side-bar-item-caption">Profile</span>
                                </NavLink>
                                <a onClick={onLogout} className="side-bar-item">
                                    <AiOutlineLogout/>
                                    <span className="side-bar-item-caption">Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </Navbar>
            <div ref={(div) => {
                sideNavRaf = div
            }}
                 className="side-nav-open border-radius-0 card">
                <NavLink
                    to="/"
                    end
                    className="d-flex justify-content-center sticky-top bg-white"
                >
                    <img src={logo} className="logo"/>
                </NavLink>
                <Accordion defaultActiveKey={`${isSideBarAccordionActive()}`}>
                    {
                        sideBarItems.map((items, index) => {
                            return items.subMenu.length !== 0 ? (
                                <Accordion.Item key={index.toString()} eventKey={`${index}`} className="mt-2">
                                    <Accordion.Header>
                                        <div className="side-bar-item">
                                            {items.icon}
                                            <span className="side-bar-item-caption">{items.title}</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {items.subMenu.map((subItem, index) => (
                                            <NavLink
                                                key={index.toString()}
                                                className={(navData) => navData.isActive
                                                    ? "side-bar-subitem-active side-bar-subitem"
                                                    : "side-bar-subitem"}
                                                to={subItem?.url}
                                                end>
                                                {subItem?.icon}
                                                <span className="side-bar-subitem-caption">{subItem?.title}</span>
                                            </NavLink>
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ) : (
                                <NavLink key={index.toString()}
                                    to={"/"}
                                    className={(navData) => navData.isActive
                                        ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"
                                    }
                                    end
                                >
                                    {items.icon}
                                    <span className="side-bar-item-caption">{items.title}</span>
                                </NavLink>
                            )
                        })
                    }

                </Accordion>
            </div>
            <div ref={(div) => (contentRef = div)} className="content">
                {props.children}
            </div>
        </Fragment>
    );
};

export default MasterLayout;