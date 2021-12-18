import React, { useState, useRef, useEffect } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  Form,
  Button,
  Spinner,
  Row,
  Col,
  ButtonGroup,
  Image,
  Badge,
} from "react-bootstrap";
import {
  deleteVehicle,
  updateVehicle,
  uploadVehicleImage,
} from "../../api/admin-vehicle-service";
import alertify from "alertifyjs";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getVehicle } from "../../api/vehicle-service";
import { isAdmin } from "../../utils/auth";

const VehicleEdit = () => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isNewImage, setIsNewImage] = useState(false);
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState("");
  const fileImageRef = useRef();

  const [initialValues, setInitialValues] = useState({
    id: "",
    model: "",
    doors: "",
    seats: "",
    luggage: "",
    transmission: "",
    airConditioning: true,
    fuelType: "",
    age: "",
    pricePerHour: "",
  });

  const validationSchema = Yup.object({
    model: Yup.string().required("Please enter the model"),
    doors: Yup.number().required("Please enter number of doors"),
    seats: Yup.number().required("Please enter number of seats"),
    luggage: Yup.number().required("Please enter luggage capacity"),
    transmission: Yup.string().required("Please enter type of transmission"),
    airConditioning: Yup.boolean().required(
      "Please enter whether air conditioning is exist"
    ),
    fuelType: Yup.string().required("Please enter type of fuel"),
    age: Yup.number().required("Please enter type age"),
    pricePerHour: Yup.number().required("Please enter price per hour"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    var imageId = "";

    try {
      if (isNewImage) {
        // Eğer araç fotoğrafı değiştirildiyse
        const formData = new FormData();
        formData.append("file", values.image);
        const respUpload = await uploadVehicleImage(formData);
        if (respUpload.status !== 200)
          throw "An error was occured while uploading image";

        imageId = respUpload.data.imageId;
      } else {
        imageId = values.image[0];
      }

      delete values["image"];

      const respVehicle = await updateVehicle(values, imageId, vehicleId);
      if (respVehicle.status !== 200) throw respVehicle.responce.data.message;
      setLoading(false);
      toast("The vehicle was updated successfully");
    } catch (err) {
      toast("An error occured while updating the vehicle");
      console.log(err);
      setLoading(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleImageChange = () => {
    const file = fileImageRef.current.files[0];
    if (!file) return;

    formik.setFieldValue("image", file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setImageSrc(reader.result);
    };
    setIsNewImage(true);
  };

  const handleSelectImage = () => {
    fileImageRef.current.click();
  };

  const handleDelete = () => {
    alertify.confirm(
      "Delete",
      "Are you sure want to delete?",
      () => {
        setDeleting(true);
        deleteVehicle(vehicleId)
          .then((resp) => {
            toast("Vehicle was deleted successfully");
            setDeleting(false);
            navigate("/admin/vehicles");
          })
          .catch((err) => {
            toast("An error occured");
            setDeleting(false);
          });
      },
      () => {}
    );
  };

  useEffect(() => {
    setLoading(true);
    getVehicle(vehicleId).then((resp) => {
      setInitialValues(resp.data);
      console.log(resp.data);

      setImageSrc(
        `${process.env.REACT_APP_API_URL}files/display/${resp.data.image[0]}`
      );

      setLoading(false);
    });
  }, []);

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Row>
        <Col lg={3} className="image-area">
          <Form.Control
            ref={fileImageRef}
            type="file"
            name="image"
            onChange={handleImageChange}
            className="d-none"
          />
          <Image src={imageSrc} className="img-fluid" />
          {formik.errors.image && (
            <Badge bg="danger" className="image-area-error">
              Please select an image
            </Badge>
          )}
          <Button
            onClick={handleSelectImage}
            variant={formik.errors.image ? "danger" : "primary"}
          >
            Select Image
          </Button>
        </Col>

        <Col lg={9}>
          <Row>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("model")}
                isInvalid={!!formik.errors.model}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.model}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Doors</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("doors")}
                isInvalid={!!formik.errors.doors}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.doors}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Seats</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("seats")}
                isInvalid={!!formik.errors.seats}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.seats}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Luggage</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("luggage")}
                isInvalid={!!formik.errors.luggage}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.luggage}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Transmission</Form.Label>
              <Form.Select
                {...formik.getFieldProps("transmission")}
                isInvalid={!!formik.errors.transmission}
              >
                <option>Select</option>
                <option value="Automatic">Automatic</option>
                <option value="Manuel">Manuel</option>
                <option value="Tiptronic">Tiptronic</option>
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {formik.errors.transmission}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Air Conditioning</Form.Label>
              <Form.Select
                {...formik.getFieldProps("airConditioning")}
                isInvalid={!!formik.errors.airConditioning}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {formik.errors.airConditioning}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Fuel Type</Form.Label>
              <Form.Select
                {...formik.getFieldProps("fuelType")}
                isInvalid={!!formik.errors.fuelType}
              >
                <option>Select</option>
                <option value="Electricity">Electricity</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Hydrogen">Hydrogen</option>
                <option value="LPG">LPG</option>
                <option value="CNG">CNG</option>
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {formik.errors.fuelType}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("age")}
                isInvalid={!!formik.errors.age}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.age}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Price per hour</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("pricePerHour")}
                isInvalid={!!formik.errors.pricePerHour}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.pricePerHour}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Col>
      </Row>
      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          {!initialValues.builtIn && (
            <>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading && (
                  <Spinner animation="border" variant="light" size="sm" />
                )}{" "}
                Save
              </Button>
              <Button
                type="button"
                variant="danger"
                disabled={deleting}
                onClick={handleDelete}
              >
                {deleting && (
                  <Spinner animation="border" variant="light" size="sm" />
                )}{" "}
                Delete
              </Button>
            </>
          )}

          <Button
            variant="secondary"
            type="button"
            as={Link}
            to="/admin/vehicles"
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};

export default VehicleEdit;
