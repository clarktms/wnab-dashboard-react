import { useSelector } from "react-redux";
import { selectAllCategories } from "./categorySlice";

import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

const CategoryTableList = () => {
  const categories = useSelector(selectAllCategories);

  const renderedCategories = categories.map((categories) => (
    <tr key={categories._id}>
      <td>{categories.categoryName}</td>
      <td>{"$" + categories.budgetedAmount.$numberDecimal}</td>
      <td>{categories.frequency}</td>
    </tr>
  ));

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">CategoryTable</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Category Name</th>
                      <th>Budgeted Amount</th>
                      <th>Frequency</th>
                    </tr>
                  </thead>
                  <tbody>{renderedCategories}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CategoryTableList;
