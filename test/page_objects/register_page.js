class completeRegisterClass {
    get fname () {return $('#customer_firstname')}
    get lname () {return $('#customer_lastname')}
    get password () {return $('#passwd')}
    get address () {return $('#address1')}
    get city () {return $('#city')}
    get state () {return $('#id_state')}
    get postcode () {return $('#postcode')}
    get phone () {return $('#phone_mobile')}
    get registerBtn () {return $('#submitAccount')}

    register(fname, lname, psswd, addrs, city, state, pstcode, phone) {
        this.fname.setValue(fname);
        this.lname.setValue(lname);
        this.password.setValue(psswd);
        this.address.setValue(addrs);
        this.city.setValue(city);
        this.state.selectByVisibleText(state);
        this.postcode.setValue(pstcode);
        this.phone.setValue(phone);
        this.registerBtn.click();
    }
}

export const completeRegister = new completeRegisterClass();

export const personalinfoText = [
    {
        element: '#account-creation_form div:nth-child(1) h3',
        content: 'YOUR PERSONAL INFORMATION'
    },

    {
        element: '#account-creation_form div:nth-child(1) div.required.password.form-group span',
        content: '(Five characters minimum)'
    },

    {
        element: '#account-creation_form div:nth-child(1) div:nth-child(8) label',
        content: 'Sign up for our newsletter!'
    },

    {
        element: '#account-creation_form div:nth-child(1) div:nth-child(9) label',
        content: 'Receive special offers from our partners!'
    }
]

export const personalinfoElements = ['#id_gender1', 
    '#id_gender2', 
    '#customer_firstname', 
    '#customer_lastname', 
    '#email',
    '#passwd',
    '#days',
    '#months',
    '#years',
    '#uniform-newsletter',
    '#uniform-optin'
]

export const days = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

export const months = ', -, January, February, March, April, May, June, July, August, September, October, November, December, ';

export const years = ', -, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, 1959, 1958, 1957, 1956, 1955, 1954, 1953, 1952, 1951, 1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941, 1940, 1939, 1938, 1937, 1936, 1935, 1934, 1933, 1932, 1931, 1930, 1929, 1928, 1927, 1926, 1925, 1924, 1923, 1922, 1921, 1920, 1919, 1918, 1917, 1916, 1915, 1914, 1913, 1912, 1911, 1910, 1909, 1908, 1907, 1906, 1905, 1904, 1903, 1902, 1901, 1900, ';