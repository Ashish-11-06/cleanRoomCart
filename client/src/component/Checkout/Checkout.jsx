import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Typography,
  Modal,
  Radio,
  Spin,
  message,
  Checkbox,
  Input,
} from "antd";
import axios from "axios";
import "./Checkout.css";
import { BASE_URL } from "../../API/BaseURL";
import styled from "styled-components";
import { EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const CheckoutContainer = styled.div`
  display: flex;
`;

const LeftSection = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const RightSection = styled.div`
  width: 400px; /* Adjust as needed */
`;

const AddressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ConfirmationShippingMethod = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;



const Checkout = () => {
  const [userEmail, setUserEmail] = useState("");
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true);
  const [productDetails, setProductDetails] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState("fedex");
  const [shippingAccount, setShippingAccount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null); // Changed to null initially
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [creditCardNumberError, setCreditCardNumberError] = useState("");
  const [nameOnCardError, setNameOnCardError] = useState("");
  const [expirationDateError, setExpirationDateError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [termsAcceptedError, setTermsAcceptedError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const selectedProducts = location.state?.selectedProducts || [];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.email) setUserEmail(userData.email);
    if (userData?._id) fetchUserData(userData._id);
  }, []);

  const fetchUserData = async (userId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/consumer/profile/${userId}`
      );
      const userProfile = data.user;

      if (userProfile) {
        const defaultAddr = {
          addressLine1: userProfile.addressLine1 || "",
          addressLine2: userProfile.addressLine2 || "",
          city: userProfile.city || "",
          state: userProfile.state || "",
          country: userProfile.country || "",
          zip: userProfile.zip || "",
        };
        setDefaultAddress(defaultAddr);
        setSelectedShippingAddress(defaultAddr);
        setSelectedBillingAddress(defaultAddr);
      }

      const addressRes = await axios.get(
        `${BASE_URL}/api/address/addresses/user/${userId}`
      );
      setAddresses(addressRes.data.addresses || []);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      message.error("Failed to load addresses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productDetailsPromises = selectedProducts.map(
          async (product) => {
            const response = await axios.get(
              `${BASE_URL}/api/product/get-by/${product.productId}`
            );
            const productData = response.data.product;
            return { ...productData, quantity: product.quantity };
          }
        );

        const productDetails = await Promise.all(productDetailsPromises);
        setProductDetails(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
        message.error("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    if (selectedProducts && selectedProducts.length > 0) {
      fetchProducts();
    }
  }, [selectedProducts]);

 

  const handleShippingAddressChange = () => {
    setIsModalVisible(true);
  };

  const handleBillingAddressChange = () => {
    setIsModalVisible(true);
  };

  const handleSelectShippingAddress = (e) => {
    const selected = addresses.find(
      (addr) => addr.addressLine1 === e.target.value
    );
    setSelectedShippingAddress(selected);
    if (isBillingSameAsShipping) {
      setSelectedBillingAddress(selected);
    }
    setIsModalVisible(false);
  };

  const handleSelectBillingAddress = (e) => {
    const selected = addresses.find(
      (addr) => addr.addressLine1 === e.target.value
    );
    setSelectedBillingAddress(selected);
    setIsModalVisible(false);
  };

  const calculateSubtotal = () =>
    productDetails.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  const calculateTax = () => {
    return calculateSubtotal()*0; // Assuming 5% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleBillingSameAsShippingChange = (e) => {
    setIsBillingSameAsShipping(e.target.checked);
    if (e.target.checked) {
      setSelectedBillingAddress(selectedShippingAddress);
    }
  };

  const handleShippingMethodChange = (e) => {
    setSelectedShippingMethod(e.target.value);
  };

  const handleContinue = () => {
    if (!selectedShippingAddress) {
      message.error("Please select a shipping address.");
      return;
    }
    setShowConfirmation(true);
  };

  const handleEdit = () => {
    setShowConfirmation(false);
  };

  
  const shippingAddressSection = (
    <Card className="checkout-card shipping-card">
      <Title level={5}>Shipping</Title>
      <Text strong>Shipping Address</Text>
      {loading ? (
        <Spin />
      ) : selectedShippingAddress ? (
        <AddressContainer onClick={handleShippingAddressChange}>
          <div>
            {selectedShippingAddress.addressLine1},{" "}
            {selectedShippingAddress.addressLine2}
            <br />
            {selectedShippingAddress.city}, {selectedShippingAddress.state},{" "}
            {selectedShippingAddress.zip}
            <br />
            {selectedShippingAddress.country}
          </div>
          <EditOutlined />
        </AddressContainer>
      ) : (
        <AddressContainer onClick={handleShippingAddressChange}>
          No address available
          <EditOutlined />
        </AddressContainer>
      )}

      <Checkbox
        checked={isBillingSameAsShipping}
        onChange={handleBillingSameAsShippingChange}
        style={{ marginTop: "10px" }}
      >
        My Billing address is the same as my Shipping address
      </Checkbox>
    </Card>
  );

  const billingAddressSection = (
    <Card className="checkout-card billing-card">
      <Title level={5}>Billing</Title>
      <Text strong>Billing Address</Text>
      {loading ? (
        <Spin />
      ) : selectedBillingAddress ? (
        <AddressContainer onClick={handleBillingAddressChange}>
          <div>
            {selectedBillingAddress.addressLine1},{" "}
            {selectedBillingAddress.addressLine2}
            <br />
            {selectedBillingAddress.city}, {selectedBillingAddress.state},{" "}
            {selectedBillingAddress.zip}
            <br />
            {selectedBillingAddress.country}
          </div>
          <EditOutlined />
        </AddressContainer>
      ) : (
        <AddressContainer onClick={handleBillingAddressChange}>
          No address available
          <EditOutlined />
        </AddressContainer>
      )}
    </Card>
  );

  const shippingMethodSection = (
    <Card className="checkout-card shipping-method-card">
      <Title level={5}>Shipping Method</Title>
      <Radio.Group
        onChange={handleShippingMethodChange}
        value={selectedShippingMethod}
      >
        <Radio value="fedex">
          Use my Fedex Account # (Fedex Collect) (Preferred - Daily Pick Ups)
        </Radio>
        <Radio value="dhl">
          Use my DHL Account # (DLH Collect) (Pick Ups are Scheduled to Order -
          Also Might Need Your Company Approval)
        </Radio>
      </Radio.Group>
      <Input
        placeholder="Shipping Account # or Comments"
        style={{ marginTop: "10px" }}
        value={shippingAccount}
        onChange={(e) => setShippingAccount(e.target.value)}
      />
    </Card>
  );

  const paymentSection = (
    <Card className="checkout-card payment-card">
      <Title level={5}>Payment</Title>
      <Radio.Group
        className="payment-method"
        onChange={(e) => setPaymentMethod(e.target.value)}
        value={paymentMethod}
      >
        <Radio value="authorize.net">Authorize.net</Radio>
      </Radio.Group>
  
      {paymentMethod === "authorize.net" && (
        <div className="payment-details-container">
          <Input
            className="payment-input"
            placeholder="Credit Card Number"
            value={creditCardNumber}
            onChange={(e) => {
              setCreditCardNumber(e.target.value);
              setCreditCardNumberError("");
            }}
          />
          {creditCardNumberError && <Text type="danger">{creditCardNumberError}</Text>}
  
          <Input
            className="payment-input"
            placeholder="Name on Card"
            value={nameOnCard}
            onChange={(e) => {
              setNameOnCard(e.target.value);
              setNameOnCardError("");
            }}
          />
          {nameOnCardError && <Text type="danger">{nameOnCardError}</Text>}
  
          <div className="input-row">
            <Input
              className="payment-input half-width"
              placeholder="MM/YY"
              value={expirationDate}
              onChange={(e) => {
                setExpirationDate(e.target.value);
                setExpirationDateError("");
              }}
            />
            <Input
              className="payment-input half-width"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => {
                setCvv(e.target.value);
                setCvvError("");
              }}
            />
          </div>
          {expirationDateError && <Text type="danger">{expirationDateError}</Text>}
          {cvvError && <Text type="danger">{cvvError}</Text>}
  
          <Checkbox style={{ marginBottom: "12px" }}>
            Save this card for future transactions
          </Checkbox>
        </div>
      )}
  
      <div className="terms-and-conditions">
        <Text>
          Freight is not included in the product total. By ordering, you agree
          to pay additional freight charges. You agree to all terms and
          conditions. Any cancellations can be subject to a cancellation fee.
        </Text>
        <Checkbox
          checked={termsAccepted}
          onChange={(e) => {
            setTermsAccepted(e.target.checked);
            setTermsAcceptedError("");
          }}
        >
          Yes, I agree with the above terms and conditions
        </Checkbox>
        {termsAcceptedError && <Text type="danger">{termsAcceptedError}</Text>}
      </div>
    </Card>
  );
  


  const confirmationShippingSection = (
    <Card className="checkout-card shipping-card">
      <Title level={5}>Shipping Information</Title>
      {selectedShippingAddress && (
        <div className="address-container" onClick={handleShippingAddressChange}>
          <div>
            {selectedShippingAddress.addressLine1},{" "}
            {selectedShippingAddress.addressLine2}
            <br />
            {selectedShippingAddress.city}, {selectedShippingAddress.state},{" "}
            {selectedShippingAddress.zip}
            <br />
            {selectedShippingAddress.country}
          </div>
          <EditOutlined />
        </div>
      )}
      <div className="shipping-method-edit" onClick={handleEdit}>
        Edit Shipping Method
      </div>
    </Card>
  );
  

  const confirmationBillingSection = (
    <Card className="checkout-card">
      <Title level={5}>Billing Address</Title>
      {isBillingSameAsShipping ? (
        selectedShippingAddress && (
          <AddressContainer onClick={handleBillingAddressChange}>
            <div>
              Same as Shipping Address:
              <br />
              {selectedShippingAddress.addressLine1},{" "}
              {selectedShippingAddress.addressLine2}
              <br />
              {selectedShippingAddress.city}, {selectedShippingAddress.state},{" "}
              {selectedShippingAddress.zip}
              <br />
              {selectedShippingAddress.country}
            </div>
            <EditOutlined />
          </AddressContainer>
        )
      ) : (
        selectedBillingAddress && (
          <AddressContainer onClick={handleBillingAddressChange}>
            <div>
              {selectedBillingAddress.addressLine1},{" "}
              {selectedBillingAddress.addressLine2}
              <br />
              {selectedBillingAddress.city}, {selectedBillingAddress.state},{" "}
              {selectedBillingAddress.zip}
              <br />
              {selectedBillingAddress.country}
            </div>
            <EditOutlined />
          </AddressContainer>
        )
      )}
    </Card>
  );


  const orderSummary = (
    <div className="order-summary-container">
      <h5 className="order-summary-title">
        Order Summary
        <span onClick={() => navigate("/cart")} className="edit-cart">
          Edit Cart
        </span>
      </h5>
  
      {loading ? (
        <Spin />
      ) : (
        <>
          {productDetails.map((item) => (
            <div className="order-item" key={item._id}>
              <div className="item-details">
                <img className="item-image" src={`${BASE_URL}${item.image}`} alt={item.productName} />
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <span className="item-name">{item.productName}</span>
                  <p style={{ marginTop: "4px" }}>{item.quantity} item(s)</p>
                </div>
              </div>
              <p>RS {item.price * item.quantity}</p>
            </div>
          ))}
        </>
      )}
  
      <div className="price-summary">
        <div className="price-item">
          <p>Subtotal:</p>
          <p>RS {calculateSubtotal()}</p>
        </div>
        <div className="price-item">
          <p>Tax:</p>
          <p>RS {calculateTax()}</p>
        </div>
        <h5 className="total-price">Total amount: RS {calculateTotal()}</h5>
      </div>
    </div>
  );
  

  return (
    <CheckoutContainer className="checkout-container">
      <LeftSection className="checkout-left">
        

        {!showConfirmation ? (
          <>
            {shippingAddressSection}
            {shippingMethodSection}
            <Button
              type="primary"
              onClick={handleContinue}
              style={{ backgroundColor: "black", color: "white" }}
            >
              CONTINUE
            </Button>
          </>
        ) : (
          <>
            {confirmationShippingSection}
            {confirmationBillingSection}
            {paymentSection}
            <Button
              type="primary"
              
              style={{ backgroundColor: "black", color: "white" }}
            >
              Place Order
            </Button>
          </>
        )}
      </LeftSection>

      <RightSection className="checkout-right">
        {orderSummary}
      </RightSection>

      <Modal
  title="Select Shipping Address"
  open={isModalVisible}
  onCancel={() => setIsModalVisible(false)}
  footer={null}
  className="checkout-modal"
>
  <Radio.Group
    onChange={
      isBillingSameAsShipping
        ? handleSelectShippingAddress
        : handleSelectBillingAddress
    }
    value={
      isBillingSameAsShipping
        ? selectedShippingAddress?.addressLine1
        : selectedBillingAddress?.addressLine1
    }
    className="checkout-radio-group"
  >
    {addresses.map((addr, index) => (
      <Card key={index} className="checkout-address-card">
        <Radio value={addr.addressLine1}>
          <Text className="checkout-address-text">
            {addr.addressLine1}, {addr.addressLine2}
          </Text>
          <br />
          <Text className="checkout-address-text">
            {addr.city}, {addr.state}, {addr.zip}
          </Text>
        </Radio>
      </Card>
    ))}
  </Radio.Group>
</Modal>

    </CheckoutContainer>
  );
};

export default Checkout;