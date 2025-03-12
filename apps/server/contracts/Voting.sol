// contracts/Voting.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    // Struct to store vote details
    struct Vote {
        uint256 sessionId;
        uint256 candidateId;
        address voter;
    }

    // Mapping to track votes per session and voter
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    // Array to store all votes
    Vote[] public votes;

    // Event to log votes
    event VoteCast(uint256 indexed sessionId, uint256 indexed candidateId, address indexed voter);

    // Function to cast a vote
    function castVote(uint256 _sessionId, uint256 _candidateId) external {
        require(!hasVoted[_sessionId][msg.sender], "You have already voted in this session");

        // Record the vote
        votes.push(Vote({
            sessionId: _sessionId,
            candidateId: _candidateId,
            voter: msg.sender
        }));

        // Mark the voter as having voted
        hasVoted[_sessionId][msg.sender] = true;

        // Emit an event
        emit VoteCast(_sessionId, _candidateId, msg.sender);
    }

    // Function to get total votes for a candidate in a session
    function getVoteCount(uint256 _sessionId, uint256 _candidateId) external view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < votes.length; i++) {
            if (votes[i].sessionId == _sessionId && votes[i].candidateId == _candidateId) {
                count++;
            }
        }
        return count;
    }
}