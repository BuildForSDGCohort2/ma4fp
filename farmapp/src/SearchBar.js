import React from 'react';
import { MDBInput, MDBCol } from "mdbreact";

const SearchBar = () => {
    return (
      <MDBCol md="12" sm = "4">
        <MDBInput hint="Search" type="text" containerClass="mt-0" />
      </MDBCol>
    );
  }

export default SearchBar;