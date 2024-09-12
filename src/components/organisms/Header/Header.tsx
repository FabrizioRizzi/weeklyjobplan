import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Target,
  LogOut,
  Activity,
  Briefcase,
} from "react-feather";
import Select, { OnChangeValue, StylesConfig } from "react-select";
import { signOut } from "firebase/auth";
import { auth } from "@firebaseUtils/firebase";
import Button from "@components/atoms/Button/Button";
import "./Header.scss";

type OptionType = {
  label: number;
  value: number;
};

export interface HeaderProps {
  year: number;
  week: number;
  changeYear: (newYear: number) => void;
  changeWeek: (newWeek: number) => void;
  previousWeek: () => void;
  nextWeek: () => void;
  reset: () => void;
}

const Header: React.FC<HeaderProps> = ({
  year,
  week,
  changeYear,
  changeWeek,
  previousWeek,
  nextWeek,
  reset,
}: HeaderProps) => {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth);
  };

  const openProjects = () => {
    navigate("/projects");
  };

  const openSorint = () => {
    navigate("/sorint");
  };

  const yearOptions = [2021, 2022].map((years) => ({
    label: years,
    value: years,
  }));
  const weekOptions = [...Array(52)].map((_, index) => ({
    label: index + 1,
    value: index + 1,
  }));
  const onChangeYear = useCallback(
    (newYear: OnChangeValue<{ value: number; label: number }, false>) =>
      changeYear(newYear?.value || 0),
    []
  );
  const onChangeWeek = useCallback(
    (newWeek: OnChangeValue<{ value: number; label: number }, false>) =>
      changeWeek(newWeek?.value || 0),
    []
  );

  const customStyles: StylesConfig<OptionType, false> = {
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      color: isSelected ? "#eeebdd;" : "#1b1717",
      backgroundColor: isSelected
        ? "#1b1717"
        : isFocused
        ? "#eeebdd"
        : "#fffef8",
    }),
  };

  return (
    <div className="Header__Header">
      <div className="Header__Buttons Header__Buttons--left">
        <Button primary onClick={previousWeek}>
          <ChevronLeft />
        </Button>
        <Button primary onClick={nextWeek}>
          <ChevronRight />
        </Button>
        <Button primary onClick={reset}>
          <Target />
        </Button>
      </div>

      <div className="Header__Title">
        <h2 className="Header__Title--label">Anno</h2>
        <Select
          value={{ label: year, value: year }}
          options={yearOptions}
          onChange={onChangeYear}
          styles={customStyles}
        />
        <h2 className="Header__Title--label">Settimana</h2>
        <Select
          value={{ label: week, value: week }}
          options={weekOptions}
          onChange={onChangeWeek}
          styles={customStyles}
        />
      </div>

      <div className="Header__Buttons Header__Buttons--right">
        <Button primary onClick={openSorint}>
          <Briefcase />
        </Button>
        <Button primary onClick={openProjects}>
          <Activity />
        </Button>
        <Button primary onClick={logout}>
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Header);
