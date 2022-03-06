let dataArr = [];
export const GetValidations = (objs) => {
    //   console.log("obj", obj);
    for (const obj of objs) {
        let { cellDataList } = obj;
        cellDataList.map((data) => {
            let { type } = data;
            if (type === "section" ||
                type === "pages" ||
                type === "tabs" ||
                type === "grid") {
                let { lanes } = data;
                GetValidations(lanes);
            }
            else {
                if (data?.required === true) {
                    dataArr.push(data.id);
                }
            }
        });
    }
    return dataArr;
};
