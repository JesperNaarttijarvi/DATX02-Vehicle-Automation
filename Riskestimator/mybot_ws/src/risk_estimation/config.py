from utils.Intersection import Intersection

GEN_CONFIG = {
    'wipe_plot_dir': True,
    'intersection': Intersection(),
    'save_directory': '../experiment_results/StartDist20_22047/',
    'simulation_end_time': 20.0,
    'break_communication': False,
    'communication_down_time' : 20,
    'communication_break_line' : -25, #length units from intersection
    'communication_breaking_cars' : [0,1],
    'sim_seed1' : 22047,
    'sim_seed2' : 1099
    #plot,save,nr_cars done in sim.launchhttps://www-us.apache.org/dist/zookeeper/zookeeper-3.4.13/zookeeper-3.4.13.tar.gz

}

def car(td, turn, sd, re, ki,follow_expectation,emergency_break):
    return {'travelling_direction': td,
            'turn': turn,
            'starting_distance': sd,
            'use_riskestimation': re,
            'use_known_I': ki,
            'follow_expectation':follow_expectation,
            'emergency_break':emergency_break}

#dist is distance from the back line at 125, not from the intersection
CARS = {#   trav_dir  turn      dist      RE     KnownI FollowE EB
    0 : car('north', 'left',     50,      True,  False, True,   True),
    1 : car('south', 'straight',    50,      True,  False, True,   True),
    2 : car('east',  'left',   50,      True,  True,  True,   True),
    3 : car('west',  'right',     50,      True,  True,  True,   True)
}

SIM_CONFIG = {
    'xy_deviation' : 0.3,
    'theta_deviation' : 0.1,
    'speed_deviation': 0.2,
    'slowdown': 1.5,
    'rate': 15,
    'pid' : (0.4, 0.0, 0.05),
    'lookahead': 5,
    'carlength': 4,

    'total_nr_particles': 400,
    'discard_measurement_time': 0.15, #seconds
    'Es_threshold': 0.5,
    'risk_threshold': 0.8,
    'save_id' : 1

}

RISK_CONFIG = {
    'prediction_dev_coeff': 2,
    'gap_model': {
        'L': 1.0,
        'x0': 6.1,
        'k': 1,

        'x0_2': 1.5,
        'k2': 3
    },
    'Is_comply': 0.75,
    'Ic_same': 0.5,
    'grant_threshold': 0.5


}
