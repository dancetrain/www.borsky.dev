import React from "react";
import Layout from "../components/Layout";

const CVPage = () => {
  return (
    <Layout mainStyles={{ paddingTop: "1rem", marginBottom: "auto" }}>
      <h1>Pavel Borsky</h1>

      <p>
        As an experienced infrastructure architect and senior developer, I am committed to improving development
        processes and implementing cost-effective, open-source solutions to achieve optimal performance and reduce
        vendor lock-in. <br />
        My target is to build and lead talented teams, mentor junior developers, and collaborate with stakeholders to
        deliver high-quality products and services that exceed customer expectations.
      </p>

      <h2>Technology Stack / Skills</h2>
        <dl>
            <dt>Programming languages</dt>
            <dd>Kotlin / Java</dd>
            <dd>Typescript</dd>

            <dt>Backend Frameworks</dt>
            <dd>Spring Boot</dd>
            <dd>Ktor</dd>
            <dd>Netty</dd>
            <dd>gRPC</dd>

            <dt>Frontend Frameworks</dt>
            <dd>React</dd>
            <dd>Vite</dd>
            <dd>Gatsby</dd>

            <dt>DevOps</dt>
            <dd>Ansible</dd>
            <dd>Bash Scripting (there are use cases when it is applicable ¯\_( ° ʖ °)_/¯ )</dd>
            <dd>D2Lang (https://play.d2lang.com)</dd>
            <dd>Teamcity</dd>
            <dd>Github Actions</dd>
            <dd>Docker</dd>

            <dt>Public Profiles</dt>
            <dd><a href="https://github.com/dancetrain">Github</a></dd>
            <dd><a href="https://www.linkedin.com/in/pavel-borsky-58694144/">LinkedIn</a></dd>

        </dl>
    </Layout>
  );
};

export default CVPage;
