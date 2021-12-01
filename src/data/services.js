import {
    GiCalendar,
    GiTakeMyMoney,
    GiPayMoney,
    GiVacuumCleaner,
  } from "react-icons/gi";

const services = [
    {
      id: 1,
      title: "Flex Renting",
      description:
        "You can change or cancel most reservations free of charge up to 48 hours before pickup",
      icon: <GiCalendar className="icon"/>,
    },
    {
      id: 2,
      title: "No Extra Price",
      description:
        "You will not encounter surprise payments. You know exactly what you're paying for.",
      icon: <GiTakeMyMoney className="icon"/>,
    },
    {
      id: 3,
      title: "Price Equalization",
      description:
        "If you find the same service cheaper, we will provide the service at the price you found",
      icon: <GiPayMoney className="icon"/>,
    },
    {
      id: 4,
      title: "Hygienic Cars",
      description:
        "We disinfect our vehicles before giving them to you to keep you safe in the driver's seat.",
      icon: <GiVacuumCleaner className="icon"/>,
    },
  ];

  export default services;