/* eslint-disable */
/* tslint:disable */

describe("When user clicks “I can’t do that thing today.”", () => {
    it("Opens an confirm", () => {
        cy.visit("localhost:3000");
        const stub = cy.stub();
        cy.on("window:confirm", stub);
        cy.get('button.skipButton').click().then(() => {
          expect(stub.getCall(0)).to.be.calledWith("Are you sure you want a new thing?");
        });
    });
});
