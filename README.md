<p align="center">
  <h1 align="center">Assessment Okupasi API</h1>

  <p align="center">
    REST API of Assessment Okupasi Application
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#api-spec">API Spec</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

Vocational schools contribute the largest number of unemployed in Indonesia. With that problem, this program exist.

This project aims to help match vocational school graduates with the industry and help the industry find suitable candidates. It assesses the suitability of graduates competencies based on the curriculum with the industry.

This project implements the REST method and applies a clean architecture structure. So, it can be applied and scaled up easily at any time.

## Getting Started

### Prerequisites

When you're going to contribute or build, you'll need at least:
  - Node.js 18.x
  - PostgreSQL 14.x

### Installation or Configure

```bash
# clone if you don't have the code base
$ git clone git@github.com:dhichii/assessment-okupasi-api.git

# install dependencies
$ npm install

# build
$ npm run build
```

After build, copy and configure the `.env.example` file to be `.env` for the main configuration. Run the `npm run migrate` to migrate db, `npm run seed` to add some data, and `npm start` command to start.

## API Spec
For the API Spec documentation, you can access it [HERE](https://github.com/dhichii/assessment-okupasi-api/tree/main/doc).

## Contact

- Adhicitta Masran - <adhicittamasran@gmail.com>
