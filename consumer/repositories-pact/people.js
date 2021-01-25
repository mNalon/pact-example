const path = require("path")
const chai = require("chai")
const { Pact } = require("@pact-foundation/pact")
const chaiAsPromised = require("chai-as-promised")
const expect = chai.expect

const { getPeople, getPersonById } = require('../repositories/people')

chai.use(chaiAsPromised)

describe("Pact", () => {
  // (1) Create the Pact object to represent your provider
  const provider = new Pact({
    consumer: "ConsumerApp",
    provider: "PeopleAPI",
    port: 1234,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "INFO",
  })

  // this is the response you expect from your Provider
  const EXPECTED_PEOPLE_BODY = [
    {
      id: 1,
      name: "John Mackanzie",
      age: 29,
      occupation: 'teacher'
    },
    {
      id: 2,
      name: "Lindsi Mackmend",
      age: 29,
      occupation: 'engineer'
    }
  ]

  context("when there are a list of people", () => {
    before(async () =>
      await provider
        // (2) Start the mock server
        .setup()
        // (3) add interactions to the Mock Server, as many as required
        .then(() => 
          {
            provider.addInteraction({
              // The 'state' field specifies a "Provider State"
              state: "there is a list of people",
              uponReceiving: "a request for people",
              withRequest: {
                method: "GET",
                path: "/people"
              },
              willRespondWith: {
                status: 200,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: EXPECTED_PEOPLE_BODY,
              },
            })

            provider.addInteraction({
              // The 'state' field specifies a "Provider State"
              state: "there is a specific person",
              uponReceiving: "a request for person by id",
              withRequest: {
                method: "GET",
                path: "/person/1"
              },
              willRespondWith: {
                status: 200,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: EXPECTED_PEOPLE_BODY[0],
              },
            })
          }
        )
    )

    // (4) write your test(s)
    it("should return people", async () => {
      const people = await getPeople() // <- this method would make the remote http call
      expect(people).to.be.eql(EXPECTED_PEOPLE_BODY)
    })

    // (4) write your test(s)
    it("should return a person", async () => {
      const person = await getPersonById(1) // <- this method would make the remote http call
      expect(person).to.be.eql(EXPECTED_PEOPLE_BODY[0])
    })

    // (5) validate the interactions you've registered and expected occurred
    // this will throw an error if it fails telling you what went wrong
    // This should be performed once per interaction test
    after(() => provider.verify())

  })

  // (6) write the pact file for this consumer-provider pair,
  // and shutdown the associated mock server.
  // You should do this only _once_ per Provider you are testing,
  // and after _all_ tests have run for that suite
  after(() => provider.finalize())
})