# a python class to contain intersection information
import math
import sys
sys.path.append("..")
from utils.course import *

from threading import Thread, Lock

class Intersection:

    def __init__(self):
        
        self.turns = ("left", "straight", "right")
        self.travelling_directions = ("north", "east", "south", "west")
        self.laneWidth = 10 # Lanewidth for testbedd


        self.cloud_travelling_directions = {}

        #mutex used when changing priorities of the intersection
        self.mutex = Lock()

        #dict of course-instances to lookup
        self.courses = {}
        for d in self.travelling_directions:
            for t in self.turns:
                self.courses[(d,t)] = Course(d,t)
        print(self.courses)
        #to determine who has right of way
        self.prioTable = {"left": 
                            {"opposing": False, 
                            "rightof":True, 
                            "leftof": True},
                         "straight": 
                            {"opposing": True, 
                            "rightof":True, 
                            "leftof": True},
                         "right": 
                            {"opposing": True, 
                            "rightof":True, 
                            "leftof": True}}

        self.nonPrioTable = {"left": 
                                {"opposing": False, 
                                "rightof":False, 
                                "leftof": False},
                            "straight": 
                                {"opposing": True, 
                                "rightof":False, 
                                "leftof": False},
                            "right": 
                                {"opposing": True, 
                                "rightof":True, 
                                "leftof": False}}
        
        #vehicles coming in these two directions are priority by default in this intersection.
        #unless changed by a maneuver negotiation protocol
        self.priority_directions = ["east","west"]

        self.relativePositions = {}
        for td1 in self.travelling_directions:
            for td2 in self.travelling_directions:
                if td1 != td2:
                    rp = self.getRelativePosition(td1, td2)
                    self.relativePositions[td1, td2] = rp



    #south-north is prio lane TODO store this some other place
    # TODO this will change when priority changes. so it should not be fixed
    def isOnPrioLane(self, travelling_direction):
        return travelling_direction in self.priority_directions

    # uses directions list above to determine whether or not other vehicle (second argument) is 
    # to the left of, to the right of or opposite the ego-vehicle (the first argument)
    def getRelativePosition(self, td1, td2):
        id1 = self.travelling_directions.index(td1)
        id2 = self.travelling_directions.index(td2)

        diff = id2 - id1

        #wrap around
        if diff == 3:
            diff = -1
        elif diff == -3:
            diff = 1

        if abs(diff) == 2:
            return "opposing"
        elif diff == 1:
            return "leftof"
        elif diff == -1:
            return "rightof"

    ## Determine if the ego vehice has right of way over another vehicle
    def hasRightOfWay(self, travelling_direction, turn, other_vehicle_td):
        if other_vehicle_td == "middle": #If other vehicle in the intersection EME
            return False
        elif travelling_direction == "middle": #If the agent is in the intersection
            #print("I'm in the intersection")
            return True
        elif other_vehicle_td == "out" or travelling_direction == "out": #If vehicle has left the intersection already
            return True
        elif travelling_direction == other_vehicle_td: #If the agents travel in the same direction 
            return True 

        #calculate relative position and lookup if ego-vehicle has priority
        #rel_pos_opposing = self.getRelativePosition(travelling_direction, other_vehicle_td)
        rel_pos_opposing = self.relativePositions[travelling_direction, other_vehicle_td]
        if self.isOnPrioLane(travelling_direction):
            return self.prioTable[turn][rel_pos_opposing]
        else:
            return self.nonPrioTable[turn][rel_pos_opposing]

    
    def getTravellingDirection(self, x, y, theta, intersection):
        if theta > math.pi:
            theta -= 2*math.pi
        elif theta < -math.pi:
            theta += 2*math.pi
        middlex = 0
        middley = 0
        if intersection is "Intersection_1":
            middlex = 1200
            middley = 6350
        elif intersection is "Intersection_2": #
            middlex = 1200
            middley = 3800
        elif intersection is "Intersection_3":
            middlex = 3225
            middley = 6600
        elif intersection is "Roundabout":
            middlex = 2925
            middley = 4000
        #laneWidth = 800
      
        print("x: " + str(x))
        print("y: " + str(y))
        print("theta: " + str(theta))

        print("p3: " + str(x >= middlex+(self.laneWidth/2)))
        print("and " + str(theta >= math.pi/4))
        print("and " + str(theta <= 3*math.pi/4))
    
        if y <= middley-(self.laneWidth/2) and (theta >= 3*math.pi/4 or theta <= -3*math.pi/4):
            return "west"
        elif y >= middley+(self.laneWidth/2) and theta <= math.pi/4 and theta >= -math.pi/4: #EME: added el and middle
            return "east"
        elif x <= middlex-(self.laneWidth/2) and theta <= -math.pi/4 and theta >= -3*math.pi/4:
            return "south"
        elif x >= middlex+(self.laneWidth/2) and theta >= math.pi/4 and theta <= 3*math.pi/4:
            return "north"
        elif x < middlex+self.laneWidth/2 and x > middlex-self.laneWidth/2 and y < middlex+self.laneWidth/2 and y > middlex-self.laneWidth/2:
            print("My coordinates: " + str(x) + " " + str(y) + " " + str(theta))
            return "middle"
        else:
            return "out" #None #Has left intersection
        
    ## Return agents that the selected agent hasn't got right-of-way to 
    def getUnsafeAgents(self, ego_Id, agent_pose, agent_poses): #EME check this

        unsafe_agents = {}
        #if ego_Id in self.cloud_travelling_directions: #EME
        #    agent_direction = self.cloud_travelling_directions[ego_Id]
        #else:
        agent_direction = self.getTravellingDirection(*agent_pose)
        self.cloud_travelling_directions[ego_Id] = agent_direction

        # Check if any of the other agents have priority over the selected agents for the 3 possible turns
        for turn in self.turns:
            ids = []
            for id, pose in agent_poses:
                #if id in self.cloud_travelling_directions: #EME Always chooses out
                    #td = self.cloud_travelling_directions[id]
                #else:
                if id == ego_Id: #Don't ad the ego vehicle
                    continue
                td = self.getTravellingDirection(*pose)
                self.cloud_travelling_directions[id] = td
                #print(self.cloud_travelling_directions[id])
                if not self.hasRightOfWay(agent_direction, turn, td):
                    ids.append(id)
            unsafe_agents[turn] = ids

        return unsafe_agents


