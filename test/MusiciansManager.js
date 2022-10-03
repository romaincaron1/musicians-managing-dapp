const { expect } = require("chai");
const hre = require("hardhat");
require("@nomiclabs/hardhat-waffle");

describe("MusiciansManager", function () {
	it("Should add a musician", async function () {
		const MusiciansManager = await hre.ethers.getContractFactory("MusiciansManager");
		const musiciansManager = await MusiciansManager.deploy();
		const contract = await musiciansManager.deployed();


		const response = await contract.addMusician(addr1.address, "John");
		const addMusicianResponse = await response.wait();
		expect(addMusicianResponse.events[0].args._artistName).to.equal("John");
	});

	it("Should not add a musician if he already exists", async function () {
		const MusiciansManager = await hre.ethers.getContractFactory("MusiciansManager");
		const musiciansManager = await MusiciansManager.deploy();
		const contract = await musiciansManager.deployed();

		const [_, addr1] = await ethers.getSigners();

		await contract.addMusician(addr1.address, "John");
		let err = null;
		try {
			await contract.addMusician(addr1.address, "John2");
		} catch (error) {
			err = error;
		}
		expect(err).to.instanceof(Error);
	});

	it("Should add a track", async function () {
		const MusiciansManager = await hre.ethers.getContractFactory("MusiciansManager");
		const musiciansManager = await MusiciansManager.deploy();
		const contract = await musiciansManager.deployed();

		const [_, addr1] = await ethers.getSigners();
		await contract.addMusician(addr1.address, "John");
		const response = await contract.addTrack(addr1.address, "TrackTitle", 345);
		const addTrackResponse = await response.wait(); 
		expect(addTrackResponse.events[0].args._title).to.eq("TrackTitle");
	});

	it("Should not add a track to an unknown artist", async function () {
		const MusiciansManager = await hre.ethers.getContractFactory("MusiciansManager");
		const musiciansManager = await MusiciansManager.deploy();
		const contract = await musiciansManager.deployed();

		let err = null;
		const [_, addr1] = await ethers.getSigners();
		try {
			await contract.addTrack(addr1.address, "TrackTitle", 345);
		} catch (error) {
			err = error;
		}
		expect(err).to.instanceof(Error);
	})

	it("Should get the tracks of an artist", async function () {
		const MusiciansManager = await hre.ethers.getContractFactory("MusiciansManager");
		const musiciansManager = await MusiciansManager.deploy();
		const contract = await musiciansManager.deployed();

		const [_, addr1] = await ethers.getSigners();
		
		await contract.addMusician(addr1.address, "John");
		await contract.addTrack(addr1.address, "TrackTitle", 345);
		const response = await contract.getTracks(addr1.address);
		const getTracksResponse = await response.wait();
		expect(getTracksResponse.events[0].args._tracks).to.instanceof(Array);
	})

})