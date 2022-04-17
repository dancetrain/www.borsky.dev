import React, { CSSProperties } from "react";
import UnderConstruction from "../components/UnderConstruction";
import Layout from "../components/Layout";

const textStyle: CSSProperties = {
    fontSize: '40px'
}

const bodyStyle: CSSProperties = {
    background: '#e2e2e2'
}

const IndexPage: React.FC = () => {
    return <Layout>
        <div style={textStyle}><UnderConstruction /></div>
    </Layout>
}

export default IndexPage;
