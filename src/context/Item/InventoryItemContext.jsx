import { React, createContext, useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "../General/GeneralContext";

const InventoryItemContext = createContext();
export default InventoryItemContext;

export const InventoryItemProvider = ({ children }) => {
  const [getItemsData, setGetItemsData] = useState([]);
  const [getItemsError, setGetItemsError] = useState(null);
  const [getItemsIsLoading, setGetItemsIsLoading] = useState(true);

  const [addItemError, setAddItemError] = useState(null);
  const [addItemIsLoading, setAddItemIsLoading] = useState(true);
  const [addItemResponse, setAddItemResponse] = useState(null);

  const [getSingleItemData, setGetSingleItemData] = useState(null);
  const [getSingleItemError, setSingleItemError] = useState(null);
  const [getSingleItemIsLoading, setSingleItemIsLoading] = useState(true);

  const [editItemResponse, seteditItemResponse] = useState(null);
  const [editItemError, seteditItemError] = useState(null);
  const [editItemIsLoading, seteditItemIsLoading] = useState(true);
  const [editedFormData, seteditedFormData] = useState({
    barcode_id: "",
    name: "",
    description: "",
    brand: "",
    category: "",
    value: "",
    image: "",
    unit_cost: 0,
    quantity: 0,
    reorder_point: 0,
    supplier: ""
  });

  const [createReportError, setCreateReportError] = useState(null);
  const [createReportIsLoading, setCreateReportIsLoading] = useState(true);
  const [createReportResponse, setCreateReportResponse] = useState(null);

  const { handleAddFile, addFileError } =
  useContext(GeneralContext);

  const getInventoryItems = async () => {
    setGetItemsIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/item`);
      setGetItemsData(response.data.items);
    } catch (error) {
      setGetItemsError(error);
    } finally {
      setGetItemsIsLoading(false);
    }
  };

  const getInventorySingleItem = async (pk) => {
    setSingleItemIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/item/${pk}`);
      setGetSingleItemData(response.data.item);
      seteditedFormData({
        barcode_id: response.data.item.barcode_id || "",
        name: response.data.item.name || "",
        description: response.data.item.description || "",
        brand: response.data.item.brand || "",
        category: response.data.item.category || "",
        value: response.data.item.value || "",
        image: response.data.item.image || "",
        unit_cost: response.data.item.unit_cost || 0,
        quantity: response.data.item.quantity || 0,
        reorder_point: response.data.item.reorder_point || 0,
        supplier: response.data.item.supplier || ""
      });
    } catch (error) {
      setSingleItemError(error);
    } finally {
      setSingleItemIsLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setAddItemIsLoading(true);
  
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    const imageData = e.target.image.files[0];
  
    const fileResponse = await handleAddFile(imageData);
  
    if (fileResponse && fileResponse.success) {
      const formData = {
        name: e.target.name.value,
        description: e.target.description.value,
        brand: e.target.brand.value,
        category: e.target.category.value,
        value: e.target.value.value,
        image: fileResponse.url,
        unit_cost: e.target.unit_cost.value,
        quantity: e.target.quantity.value,
        reorder_point: e.target.reorder_point.value,
        supplier: e.target.supplier.value,
      };
  
      try {
        const result = await axios.post(`${baseUrl}/api/item`, formData);
        setAddItemResponse(result.data);
      } catch (error) {
        setAddItemError(error.response.data.message);
        console.log(error);
      }
    } else {
      setAddItemError(addFileError || "File upload failed");
    }
  
    setAddItemIsLoading(false);
  };


  const handleEditItem = async (e, pk) => {
    e.preventDefault();
    seteditItemIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    let fileResponse;

    if (e.target.image.files[0]) {
      const imageData = e.target.image.files[0];
      fileResponse = await handleAddFile(imageData);
    }

    const updatedData = {
      barcode_id: editedFormData.barcode_id,
      name: editedFormData.name,
      description: editedFormData.description,
      brand: editedFormData.brand,
      unit_cost: editedFormData.unit_cost,
      quantity: editedFormData.quantity,
      reorder_point: editedFormData.reorder_point,
      supplier: editedFormData.supplier,
      category: editedFormData.category,
      value: editedFormData.value,
      image:
        fileResponse && fileResponse.success
          ? fileResponse.url
          : editedFormData.image,
    };
    try {
      const result = await axios.patch(
        `${baseUrl}/api/item/${pk}`,
        updatedData
      );
      seteditItemResponse(result.data);
    } catch (error) {
      seteditItemError(error.response.data.message);
    } finally {
      seteditItemIsLoading(false);
    }

    if (!fileResponse || !fileResponse.success) {
      seteditItemError(addFileError || "File upload failed");
      seteditItemIsLoading(false);
    }
  };

  const generateReport = async (formatQuery) => {
    setCreateReportIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/item/inventory-report?format=${formatQuery}`, {
        responseType: 'blob', // Important to handle binary data
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'edo_inventory_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setCreateReportResponse(response);
    } catch (error) {
      setCreateReportError(error);
    } finally {
      setCreateReportIsLoading(false);
    }
  };

  let contextData = {
    getItemsIsLoading: getItemsIsLoading,
    getItemsError: getItemsError,
    getItemsData: getItemsData,
    addItemError: addItemError,
    addItemIsLoading: addItemIsLoading,
    addItemResponse: addItemResponse,
    getSingleItemIsLoading: getSingleItemIsLoading,
    getSingleItemError: getSingleItemError,
    getSingleItemData: getSingleItemData,
    editedFormData: editedFormData,
    editItemIsLoading: editItemIsLoading,
    editItemError: editItemError,
    editItemResponse: editItemResponse,
    createReportError: createReportError,
    createReportIsLoading: createReportIsLoading,
    createReportResponse: createReportResponse,
    
    getInventoryItems: getInventoryItems,
    handleAddItem: handleAddItem,
    setAddItemError: setAddItemError,
    setAddItemResponse: setAddItemResponse,
    getInventorySingleItem: getInventorySingleItem,
    seteditItemError: seteditItemError,
    seteditItemResponse: seteditItemResponse,
    handleEditItem: handleEditItem,
    seteditedFormData: seteditedFormData,
    generateReport: generateReport,
    setCreateReportResponse: setCreateReportResponse,
    setCreateReportError: setCreateReportError,
  };

  return (
    <InventoryItemContext.Provider value={contextData}>
      {children}
    </InventoryItemContext.Provider>
  );
};
