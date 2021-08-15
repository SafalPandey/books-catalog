/**
 *
 * (c) Laudio, Inc. All Rights Reserved.
 *
 * This file contains proprietary and confidential source
 * code. Unauthorized copying of this file, via any
 * medium is strictly prohibited.
 *
 * (r) 2018 Laudio is a registered trademark of Laudio, Inc.
 *
 */
/**
 *
 * (c) Laudio, Inc. All Rights Reserved.
 *
 * This file contains proprietary and confidential source
 * code. Unauthorized copying of this file, via any
 * medium is strictly prohibited.
 *
 * (r) 2018 Laudio is a registered trademark of Laudio, Inc.
 *
 */

import axios from 'axios';

/**
 * Util to make http requests.
 */
const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default http;
