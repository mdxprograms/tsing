interface StringValidator {
   isValid(s: string): boolean;
}

const numOnly = /^[0-9]+$/;

class ZipValidator implements StringValidator {
   isValid(s: string) {
      return s.length === 5 && numOnly.test(s)
   }
}

class UrlValidator implements StringValidator {
   isValid(s: string) {
      // hacky but example only  \m\(><)/m/
      return s.includes("//") && s.endsWith(".com")
   }
}

let validators: {[s: string]: StringValidator} = {};
validators["ZIP code"] = new ZipValidator();
validators["URL"] = new UrlValidator();

type School = {
   url: string,
   name: string,
   address: {
      city: string,
      state: string,
      zip: string
   }
}

type Schools = School[]

let schools: Schools = [
   {
      url: "https://google.com",
      name: "Foobars",
      address: {
         city: "Gotham",
         state: "IL",
         zip: "61821"
      }
   },
   {
      url: "https://google.com",
      name: "Foobars",
      address: {
         city: "Gotham",
         state: "IL",
         zip: "61899"
      }
   },
   {
      url: "https://google.com",
      name: "Foobars",
      address: {
         city: "Gotham",
         state: "IL",
         zip: "61822"
      }
   },
]

// Validate school info properties
const errorCollection = () => schools.map((school: School): {hasErrors: boolean, errors: string[]} => {
   let errors = []

   for (const name in validators) {
      if (validators.hasOwnProperty(name)) {
         const validate = validators[name];

         if (typeof validate === typeof ZipValidator) {
            !validate.isValid(school.address.zip) && errors.push("Invalid zip code")
         }

         if (typeof validate === typeof UrlValidator) {
            !validate.isValid(school.url) && errors.push("Invalid URL")
         }
      }
   }

   return {
      hasErrors: errors.some(e => e.length > 0),
      errors
   };
});

console.log(errorCollection());

