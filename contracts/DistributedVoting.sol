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
        require(admins[msg.sender] == true, "Not Admin");
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
        require(state == State.NotStarted, "Election already started");
        _;
    }

    modifier running() {
        require(state == State.Running, "Election has Ended");
        _;
    }

    modifier ended() {
        require(state == State.Ended, "Election Running or not started");
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
    modifier voterNotExists(address _address) {
        require(voters[_address].voterExists == false, "Already Registered");
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

    function registerVoter(string memory name)
        public
        notAdmin
        notStarted
        voterNotExists(msg.sender)
    {
        voters[msg.sender].voterAddress = msg.sender;
        voters[msg.sender].voterName = name;
        voters[msg.sender].voterExists = true;
        voters[msg.sender].registered = false;
        voters[msg.sender].voted = false;
        voterList.push(voters[msg.sender]);
    }

    function indexOf(Voter storage searchedVoter)
        private
        view
        returns (uint256)
    {
        for (uint256 i = 0; i < voterList.length - 1; i++) {
            if (voterList[i].voterAddress == searchedVoter.voterAddress) {
                return i;
            }
        }
        return voterList.length + 1;
    }

    function removeFromArray(uint256 _index) private {
        for (uint256 i = _index; i < voterList.length; i++) {
            voterList[i] = voterList[i++];
        }
        voterList.pop();
    }

    function verifyVoter(address voter) public onlyAdmin notStarted {
        require(voters[voter].voterExists == true, "Voter does not exists");
        voters[voter].registered = true;

        removeFromArray(indexOf(voters[voter]));
        // uint256 _index = voterList.length + 1;
        // for (uint256 i = 0; i < voterList.length; i++) {
        //     if (voterList[i].voterAddress == voters[voter].voterAddress) {
        //         _index = i;
        //     }
        // }
        // for (uint256 i = _index; i < voterList.length - 1; i++) {
        //     voterList[i] = voterList[i++];
        // }
        // voterList.pop();

        voterList.push(voters[voter]);
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
