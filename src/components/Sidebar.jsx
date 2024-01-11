import styled from "styled-components";
import newLogo from "../assets/puceLogo.png";
import { v } from "../styles/Variables";
import {
  AiOutlineLeft,
  AiOutlineHome,
  AiOutlineApartment,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineAnalytics, MdLogout, MdDelete, MdUpdate, MdSearch, MdInsertChart, MdOutlineAlignVerticalCenter } from "react-icons/md";
import { NavLink } from "react-router-dom";

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Container isOpen={sidebarOpen}>
      <button className="Sidebarbutton" onClick={ModSidebaropen}>
        <AiOutlineLeft />
      </button>
      <div className="Logocontent">
        <div className="imgcontent">
          <img
            src={newLogo}
            alt="Logo"
            className={sidebarOpen ? "logo-open" : "logo-closed"}
          />
        </div>
        <h2>Telecomunicaciones</h2>
      </div>
      {linksArray.map(({ icon, label, to }) => (
        <div className="LinkContainer" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `Links${isActive ? ` active` : ``}`}
          >
            <div className="Linkicon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}
      <Divider />
      {secondarylinksArray.map(({ icon, label, to }) => (
        <div className="LinkContainer" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `Links${isActive ? ` active` : ``}`}
          >
            <div className="Linkicon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}
    </Container>
  );
}

//#region Data links
const linksArray = [
  {
    label: "Informacion General",
    icon: <MdOutlineAlignVerticalCenter />,
    to: "/",
  },
  {
    label: "Insertar Red",
    icon: <MdInsertChart />,
    to: "/estadisticas",
  },
  {
    label: "Buscar Red",
    icon: <MdSearch />,
    to: "/productos",
  },
  {
    label: "Actualizar Red",
    icon: <MdUpdate />,
    to: "/diagramas",
  },
  {
    label: "Eliminar Red",
    icon: <MdDelete />,
    to: "/reportes",
  },
];
const secondarylinksArray = [
  {
    label: "Excel",
    icon: <AiOutlineSetting />,
    to: "/Excel",
  },
];
//#endregion

//#region STYLED COMPONENTS
const Container = styled.div`
  position: fixed;
  z-index: 1000;
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.sidebarBg || props.theme.bg};
  position: sticky;
  padding-top: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .Sidebarbutton {
    position: absolute;
    top: ${v.xxlSpacing};
    right: -18px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${(props) => props.theme.bgtgderecha};
    box-shadow: 0 0 4px ${(props) => props.theme.bg3},
      0 0 7px ${(props) => props.theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    transform: ${({ isOpen }) => (isOpen ? `initial` : `rotate(180deg)`)};
    border: none;
    letter-spacing: inherit;
    color: inherit;
    font-size: inherit;
    text-align: inherit;
    padding: 0;
    font-family: inherit;
    outline: none;
  }
  .Logocontent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: ${v.lgSpacing};
    .imgcontent {
      display: flex;
      img {
        max-width: 100%;
        height: auto;
        transition: transform 0.7s ease-in-out, max-width 0.7s ease-in-out;
      }
      .logo-open {
        img {
          transform: scale(1);
        }
      }
      .logo-closed {
        img {
          max-width: 50%;
          height: auto;
          transform: scale(0.7);
        }
      }
      cursor: pointer;
      transition: transform 0.7s ease-in-out;
    }

    h2 {
      display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
    }
  }
  .LinkContainer {
    margin: 8px 0;
    padding: 0 15%;
    :hover {
      background: ${(props) => props.theme.bg3};
    }
    .Links {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${v.smSpacing}-2px) 0;
      color: ${(props) => props.theme.text};
      height: 50px;
      .Linkicon {
        padding: ${v.smSpacing} ${v.mdSpacing};
        display: flex;

        svg {
          font-size: 25px;
        }
      }
      &.active {
        .Linkicon {
          svg {
            color: ${(props) => props.theme.bg4};
          }
        }
      }
    }
  }
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg3};
  margin: ${v.lgSpacing} 0;
`;

//#endregion
