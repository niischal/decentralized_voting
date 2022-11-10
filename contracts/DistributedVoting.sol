// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract DistributedVoting {
    constructor() {
        admins[msg.sender] = true;
    }

    //Variable
    struct Voter {
        address voterAddress;
        string voterName;
        bool voterExists;
        bool registered;
        bool voted;
    }
    struct Candidate {
        string candidateName;
        bool exists;
        int256 voteCount;
    }

    enum State {
        NotStarted,
        Running,
        Ended
    }

    State state;

    // Lists
    Candidate[] public candidateList;
    Voter[] public voterList;

    // mapping
    mapping(address => bool) admins;
    mapping(string => Candidate) candidates;
    mapping(address => Voter) voters;

    //modifiers
    modifier onlyAdmin() {
        require(admins[msg.sender] == true);
        _;
    }
    modifier isVoter(address _address) {
        require(voters[_address].registered == true, "Not Register");
        _;
    }

    modifier candidateExists(string memory name) {
        require(candidates[name].exists == true, "Candidate does not exist");
        _;
    }
    modifier notStarted() {
        require(state == State.NotStarted, "Election not Started");
        _;
    }

    modifier running() {
        require(state == State.Running, "Election is Running");
        _;
    }

    modifier ended() {
        require(state == State.Ended, "Election Ended");
        _;
    }

    modifier notVoted() {
        require(voters[msg.sender].voted == false, "Already voted");
        _;
    }
    modifier notAdmin() {
        require(admins[msg.sender] == false, "Admin can not Vote");
        _;
    }
    modifier candidateNotExists(string memory name) {
        require(candidates[name].exists == false, "Candidate already exists");
        _;
    }

    //functions
    function checkAdmin() public view returns (bool) {
        return admins[msg.sender];
    }

    function getState() public view returns (State) {
        return state;
    }

    function addCandidate(string memory name)
        public
        candidateNotExists(name)
        notStarted
    {
        candidates[name].candidateName = name;
        candidates[name].exists = true;
        candidates[name].voteCount = 0;
        candidateList.push(candidates[name]);
    }

    function getCandidate(string memory name)
        public
        view
        candidateExists(name)
        returns (Candidate memory candidate)
    {
        candidate = candidates[name];
        return (candidate);
    }

    function getAllCandidates()
        public
        view
        onlyAdmin
        returns (Candidate[] memory)
    {
        return (candidateList);
    }

    function startElection() public onlyAdmin notStarted {
        state = State.Running;
    }

    function endElection() public onlyAdmin running {
        state = State.Ended;
    }

    function resetElection() public onlyAdmin {
        state = State.NotStarted;
    }

    function registerVoter(string memory name) public notAdmin notStarted {
        require(voters[msg.sender].voterExists == false, "Already Registered");
        voters[msg.sender].voterAddress = msg.sender;
        voters[msg.sender].voterName = name;
        voters[msg.sender].voterExists=true
        voters[msg.sender].registered = false;
        voters[msg.sender].voted = false;
        voterList.push(voters[msg.sender]);
    }

    function verifyVoter(address _address) public onlyAdmin notStarted {
        voters[_address].registered = true;
    }

    function getAllVoters() public view onlyAdmin returns (Voter[] memory) {
        return voterList;
    }

    function castVote(string memory name)
        public
        candidateExists(name)
        notAdmin
        running
    {
        candidates[name].voteCount++;
        voters[msg.sender].voted = true;
    }
}
