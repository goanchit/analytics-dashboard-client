import axios from "axios";

export const getCurrentInsites = async(startDate, toDate) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/data`, {
            params: {
                "from_ts": startDate,
                "to_ts": toDate
            }
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
        return {};
    } catch(err) {
        console.error(err)
        return {};
    }
}

export const getLogs = async(startDate, toDate, pageNo) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/logs`, {
            params: {
                "from_ts": startDate,
                "to_ts": toDate,
                "page_no": pageNo,
            }
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
        return {};
    } catch(err) {
        console.error(err)
        return {};
    }
}