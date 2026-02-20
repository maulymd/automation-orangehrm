describe("Categories API Automation", () => {

  let createdId;

  it("GET all categories", () => {
    cy.request("https://api.escuelajs.co/api/v1/categories").then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.include.all.keys("id","name","slug","image");
    });
  });

  it("GET category by slug", () => {
    cy.request("https://api.escuelajs.co/api/v1/categories/slug/clothes").then(res => {
      expect(res.status).to.eq(200);
      expect(res.body.slug).to.eq("clothes");
    });
  });

  it("POST create category", () => {
    cy.request("POST","https://api.escuelajs.co/api/v1/categories",{
      name:"QA Automation Category",
      image:"https://placeimg.com/640/480/tech"
    }).then(res => {
      expect(res.status).to.eq(201);
      expect(res.body.name).to.eq("QA Automation Category");
      createdId = res.body.id;
    });
  });

  it("PUT update category", () => {
    cy.request("PUT",`https://api.escuelajs.co/api/v1/categories/${createdId}`,{
      name:"Updated QA Category",
      image:"https://placeimg.com/640/480/any"
    }).then(res=>{
      expect(res.status).to.eq(200);
      expect(res.body.name).to.eq("Updated QA Category");
    });
  });

  it("GET products by category", () => {
    cy.request("https://api.escuelajs.co/api/v1/categories/1/products").then(res=>{
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
      if(res.body.length>0){
        expect(res.body[0]).to.include.all.keys(
          "id","title","price","description","category","images"
        );
      }
    });
  });

  it("Response time under 2s", () => {
    cy.request("https://api.escuelajs.co/api/v1/categories")
      .its("duration")
      .should("be.lessThan",2000);
  });

});

describe("Users API Automation", () => {

  const baseUrl = "https://api.escuelajs.co/api/v1/users";
  let userId;
  let emailTest = `qa_mauly@mail.com`;

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  it("GET all users", () => {
    cy.request({method:"GET", url:baseUrl, headers})
      .then(res=>{
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an("array");
        expect(res.body[0]).to.include.all.keys(
          "id","email","password","name","role","avatar"
        );
      });
  });

  it("POST create user", () => {
    cy.request({
      method:"POST",
      url:baseUrl,
      headers,
      body:{
        name:"QA Automation",
        email:emailTest,
        password:"1234",
        avatar:"https://picsum.photos/800"
      }
    }).then(res=>{
      expect(res.status).to.eq(201);
      expect(res.body.email).to.eq(emailTest);
      expect(res.body.name).to.eq("QA Automation");
      expect(res.body).to.have.property("id");

      userId = res.body.id;
    });
  });

  it("GET single user by id", () => {
    cy.request({
      method:"GET",
      url:`${baseUrl}/${userId}`,
      headers
    }).then(res=>{
      expect(res.status).to.eq(200);
      expect(res.body.id).to.eq(userId);
      expect(res.body).to.include.all.keys(
        "id","email","password","name","role","avatar"
      );
    });
  });

  it("PUT update user", () => {
    cy.request({
      method:"PUT",
      url:`${baseUrl}/${userId}`,
      headers,
      body:{
        name:"Updated QA Name"
      }
    }).then(res=>{
      expect(res.status).to.eq(200);
      expect(res.body.name).to.eq("Updated QA Name");
    });
  });

  it("POST check email availability (used)", () => {
    cy.request({
      method:"POST",
      url:`${baseUrl}/is-available`,
      headers,
      body:{ email: emailTest }
    }).then(res=>{
      expect(res.status).to.eq(201);
      expect(res.body.isAvailable).to.eq(false);
    });
  });

});