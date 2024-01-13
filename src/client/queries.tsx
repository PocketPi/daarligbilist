import { useState, useEffect } from "react";
import { BadDriverInfoInterface, APIResponseInterface, BadDriverReportInterface } from "../shared/types";
import { get } from "./fetchers";
import axios from "axios";

export const getBadDrivers = () => {
    const [data, setData] = useState<BadDriverInfoInterface[]>([]);

    const getData = async () => {
        const { badDrivers } = await get<APIResponseInterface>("http://localhost:4000/api/top10");
        setData(badDrivers);
    };

    useEffect(() => {
        getData();
    }, []);

    return data;
};

export function reportBadDriver(report: BadDriverReportInterface) {
    try {
        axios.post<BadDriverReportInterface>("http://localhost:4000/api/report_bad_driver", report);
    } catch (error) {
        console.log("error" + error);
        return Promise.reject(error);
    }
};
