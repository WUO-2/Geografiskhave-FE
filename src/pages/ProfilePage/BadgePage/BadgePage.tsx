import React from "react";
import badgeImg from "../../../assets/images/badges/BadgeProfil.png";
import Badge from "../../../components/badge/badge";
import "./BadgePage.scss";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

const BadgePage = () => {
  const { authStore } = useStore();

  return (
    <div className="BadgePage">
      {authStore.user?.badges.map((badge, index) => (
        <Badge key={index} {...badge} />
      ))}
    </div>
  );
};

export default observer(BadgePage);
